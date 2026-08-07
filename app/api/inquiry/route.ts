import { NextResponse } from 'next/server';
import { inquirySchema, quickInquirySchema } from '@/lib/inquiry-schema';
import { deliverInquiry } from '@/lib/mail';

/**
 * Project inquiry endpoint.
 *
 * Validation and delivery are both real. With no provider configured the route
 * still returns 200 with `delivered: false` and logs the submission, and the UI
 * offers the visitor a mailto fallback — an inquiry is never silently dropped,
 * whether the cause is missing configuration or a provider outage.
 */

/* nodemailer needs Node built-ins, so pin the runtime rather than letting a
   future edge default break delivery quietly. */
export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  /* Honeypot, checked before validation and not after.
     Both schemas declare `website` as max-length 0, so a filled honeypot fails
     validation first and the old post-parse check could never run — a bot got a
     422 naming `website` as the offending field, which is a tidy instruction on
     how to get through next time. Accept silently instead: no signal back. */
  if (
    body !== null &&
    typeof body === 'object' &&
    typeof (body as { website?: unknown }).website === 'string' &&
    (body as { website: string }).website.length > 0
  ) {
    return NextResponse.json({ ok: true, delivered: true });
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


  const d = parsed.data;
  const payload =
    'company' in d ? ({ kind: 'full', ...d } as const) : ({ kind: 'quick', ...d } as const);

  const result = await deliverInquiry(payload);

  /* Log on failure only. A delivered inquiry is already in the inbox, and
     copying every enquirer's details into the platform's log store for no
     operational reason is not something to do by default. */
  if (!result.delivered) {
    console.info('[inquiry] not delivered (%s):', result.reason, {
      kind: payload.kind,
      name: d.name,
      email: d.email,
      ...('company' in d
        ? { company: d.company, region: d.region, services: d.services }
        : { source: d.source }),
    });
  }

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
