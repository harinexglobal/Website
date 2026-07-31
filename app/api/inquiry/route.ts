import { NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/inquiry-schema';

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

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'validation',
        issues: parsed.error.issues.map((i) => ({ path: i.path.join('.'), key: i.message })),
      },
      { status: 422 },
    );
  }

  // Honeypot tripped — accept silently so bots get no signal.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const hasMailProvider = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_URL);

  if (!hasMailProvider) {
    console.info('[inquiry] received (no mail provider configured):', {
      name: parsed.data.name,
      company: parsed.data.company,
      email: parsed.data.email,
      region: parsed.data.region,
      services: parsed.data.services,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  // TODO: send via the configured provider, then return delivered: true.
  return NextResponse.json({ ok: true, delivered: false });
}
