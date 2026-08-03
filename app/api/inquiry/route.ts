import { NextResponse } from 'next/server';
import { inquirySchema, quickInquirySchema } from '@/lib/inquiry-schema';

/**
 * Project inquiry endpoint.
 *
 * Validation is real. Delivery is NOT yet wired to a mail provider — see
 * README.md ("Wiring up the contact form"). Until an provider is configured the
 * route returns `delivered: false`, and the UI offers the visitor a mailto
 * fallback so no inquiry is silently dropped.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  // Two shapes are accepted: the full /contact form, and the three-field
  // short form embedded on capability pages.
  const full = inquirySchema.safeParse(body);
  const quick = full.success ? null : quickInquirySchema.safeParse(body);

  if (!full.success && !quick?.success) {
    // Report against whichever shape the payload most resembles.
    const err = quick && 'error' in quick ? quick.error : full.error;
    return NextResponse.json(
      {
        ok: false,
        error: 'validation',
        issues: err.issues.map((i) => ({ path: i.path.join('.'), key: i.message })),
      },
      { status: 422 },
    );
  }

  const parsed = full.success ? full : quick!;
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  // Honeypot tripped — accept silently so bots get no signal.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const hasMailProvider = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_URL);

  if (!hasMailProvider) {
    const d = parsed.data;
    console.info('[inquiry] received (no mail provider configured):', {
      kind: 'company' in d ? 'full' : 'quick',
      name: d.name,
      email: d.email,
      ...('company' in d
        ? { company: d.company, region: d.region, services: d.services }
        : { source: d.source }),
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  // TODO: send via the configured provider, then return delivered: true.
  return NextResponse.json({ ok: true, delivered: false });
}
