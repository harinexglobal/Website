import type { InquiryInput, QuickInquiryInput } from '@/lib/inquiry-schema';
import { CONTACT } from '@/lib/content';

/**
 * Inquiry delivery.
 *
 * Two providers, chosen by which environment variable is set. SMTP is checked
 * first because it is the one that works without owning a domain — Resend will
 * only send from a domain you have verified, and its `onboarding@resend.dev`
 * test sender delivers to the account owner and nobody else.
 *
 * The two share one call site so moving from a Gmail inbox to company mail
 * later is an environment change, not a code change.
 */

type Payload =
  | ({ kind: 'full' } & InquiryInput)
  | ({ kind: 'quick' } & QuickInquiryInput);

export type DeliveryResult = { delivered: boolean; reason?: string };

/** Where inquiries land. Falls back to the address published on the site. */
function recipient(): string {
  return process.env.INQUIRY_TO?.trim() || CONTACT.email;
}

/**
 * The From address.
 *
 * With Gmail SMTP this must be the authenticated mailbox — Gmail silently
 * rewrites anything else, which makes debugging delivery a waste of an
 * afternoon. So it defaults to the SMTP user rather than to something invented.
 */
function sender(smtpUser?: string): string {
  const explicit = process.env.INQUIRY_FROM?.trim();
  if (explicit) return explicit;
  if (smtpUser) return `HariNex Global Website <${smtpUser}>`;
  return 'HariNex Global Website <onboarding@resend.dev>';
}

const REGION_LABEL: Record<string, string> = {
  taiwan: 'Taiwan',
  india: 'India',
  other: 'Other',
};

function subjectFor(p: Payload): string {
  return p.kind === 'full'
    ? `Website inquiry — ${p.company} (${p.name})`
    : `Website inquiry — ${p.name}${p.source ? ` (${p.source})` : ''}`;
}

function rowsFor(p: Payload): [string, string][] {
  const rows: [string, string][] = [
    ['Name', p.name],
    ['Email', p.email],
  ];

  if (p.kind === 'full') {
    if (p.phone) rows.push(['Phone', p.phone]);
    rows.push(['Company', p.company]);
    rows.push(['Region', REGION_LABEL[p.region] ?? p.region]);
    rows.push(['Services', p.services.join(', ')]);
    rows.push(['Brief', p.brief]);
  } else {
    rows.push(['Page', p.source || 'Not recorded']);
    rows.push(['Message', p.message]);
  }

  rows.push(['Received', new Date().toISOString()]);
  return rows;
}

function textBody(p: Payload): string {
  return rowsFor(p)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function htmlBody(p: Payload): string {
  const rows = rowsFor(p)
    .map(
      ([k, v]) => `<tr>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font:600 12px/1.4 system-ui,sans-serif;color:#64748b;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${esc(k)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font:400 14px/1.6 system-ui,sans-serif;color:#0f172a">${esc(v).replace(/\n/g, '<br>')}</td>
    </tr>`,
    )
    .join('');

  return `<div style="background:#f8fafc;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
    <div style="background:#0A192F;padding:18px 20px">
      <p style="margin:0;font:700 15px/1.3 system-ui,sans-serif;color:#fff">HariNex Global — website inquiry</p>
      <p style="margin:4px 0 0;font:400 12px/1.4 system-ui,sans-serif;color:#94a3b8">${p.kind === 'full' ? 'Full contact form' : 'Short form'}</p>
    </div>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
    <div style="padding:14px 20px;background:#f8fafc">
      <a href="mailto:${esc(p.email)}" style="font:600 13px/1.4 system-ui,sans-serif;color:#047857;text-decoration:none">Reply to ${esc(p.name)} &rarr;</a>
    </div>
  </div>
</div>`;
}

/** Gmail and most providers: smtps://user%40gmail.com:apppassword@smtp.gmail.com:465 */
async function sendViaSmtp(p: Payload, url: string): Promise<DeliveryResult> {
  const nodemailer = (await import('nodemailer')).default;
  const transport = nodemailer.createTransport(url);

  let user: string | undefined;
  try {
    user = decodeURIComponent(new URL(url).username) || undefined;
  } catch {
    /* A malformed URL will fail at sendMail with a clearer message. */
  }

  await transport.sendMail({
    from: sender(user),
    to: recipient(),
    replyTo: `${p.name} <${p.email}>`,
    subject: subjectFor(p),
    text: textBody(p),
    html: htmlBody(p),
  });

  return { delivered: true };
}

async function sendViaResend(p: Payload, key: string): Promise<DeliveryResult> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: sender(),
      to: [recipient()],
      reply_to: p.email,
      subject: subjectFor(p),
      text: textBody(p),
      html: htmlBody(p),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`resend ${res.status}: ${detail.slice(0, 300)}`);
  }
  return { delivered: true };
}

/**
 * Never throws. A failed send must not turn into a 500 for the visitor — the
 * form falls back to a mailto link on `delivered: false`, which is a worse
 * experience than a sent email but a much better one than an error page.
 */
export async function deliverInquiry(p: Payload): Promise<DeliveryResult> {
  const smtp = process.env.SMTP_URL?.trim();
  const resend = process.env.RESEND_API_KEY?.trim();

  try {
    if (smtp) return await sendViaSmtp(p, smtp);
    if (resend) return await sendViaResend(p, resend);
    return { delivered: false, reason: 'no-provider' };
  } catch (err) {
    console.error('[inquiry] delivery failed:', err instanceof Error ? err.message : err);
    return { delivered: false, reason: 'send-failed' };
  }
}
