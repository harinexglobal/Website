import { NextResponse } from 'next/server';
import { inquirySchema, quickInquirySchema } from '@/lib/inquiry-schema';
import { deliverInquiry, type InquiryAttachment } from '@/lib/mail';
import { ATTACHMENT_MAX_BYTES, checkAttachment, safeFilename } from '@/lib/attachment';

/**
 * Project inquiry endpoint.
 *
 * Validation and delivery are both real. With no provider configured the route
 * still returns 200 with `delivered: false` and logs the submission, and the UI
 * offers the visitor a mailto fallback — an inquiry is never silently dropped,
 * whether the cause is missing configuration or a provider outage.
 *
 * Two content types are accepted. The full enquiry form posts multipart, since
 * it can carry a file; the short form on the practice pages still posts JSON.
 * Both converge on the same schemas immediately, so there is one set of rules
 * rather than one per transport.
 */

/* nodemailer needs Node built-ins, so pin the runtime rather than letting a
   future edge default break delivery quietly. */
export const runtime = 'nodejs';

/**
 * Reads the body as either multipart or JSON.
 *
 * Returns the fields as a plain object plus the file, if one came with it. The
 * schemas want `services` as an array and every other field as a string, which
 * is what FormData gives us once repeated keys are collected.
 */
async function readBody(
  request: Request,
): Promise<{ fields: unknown; file: File | null } | null> {
  const type = request.headers.get('content-type') ?? '';

  if (type.includes('multipart/form-data')) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return null;
    }

    const fields: Record<string, unknown> = {};
    let file: File | null = null;

    for (const [key, value] of form.entries()) {
      if (typeof value !== 'string') {
        if (key === 'attachment' && value.size > 0) file = value;
        continue;
      }
      if (key === 'services') {
        (fields.services ??= [] as string[]) as string[];
        (fields.services as string[]).push(value);
      } else {
        fields[key] = value;
      }
    }

    return { fields, file };
  }

  try {
    return { fields: await request.json(), file: null };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const read = await readBody(request);
  if (!read) {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  const { fields: body, file } = read;

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

  // Two shapes are accepted: the full enquiry form, and the three-field short
  // form embedded on practice pages.
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

  /* The browser checks the file too, but only so the visitor gets a useful
     message. This is the check that counts — anything the browser enforces can
     be skipped by posting here directly. */
  let attachment: InquiryAttachment | undefined;
  if (file) {
    const rejection = checkAttachment({ name: file.name, size: file.size });
    if (rejection) {
      return NextResponse.json(
        { ok: false, error: 'attachment', reason: rejection },
        { status: 422 },
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    /* Belt and braces: `size` is metadata, this is what actually arrived. */
    if (bytes.byteLength > ATTACHMENT_MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: 'attachment', reason: 'size' },
        { status: 422 },
      );
    }

    attachment = {
      filename: safeFilename(file.name),
      contentType: file.type || 'application/octet-stream',
      content: bytes,
    };
  }

  const d = parsed.data;
  const payload =
    'company' in d
      ? ({ kind: 'full', ...d, attachment } as const)
      : ({ kind: 'quick', ...d } as const);

  const result = await deliverInquiry(payload);

  /* Log on failure only. A delivered inquiry is already in the inbox, and
     copying every enquirer's details into the platform's log store for no
     operational reason is not something to do by default. */
  if (!result.delivered) {
    console.info('[inquiry] not delivered (%s):', result.reason, {
      kind: payload.kind,
      name: d.name,
      email: d.email,
      attachment: attachment?.filename,
      ...('company' in d
        ? { company: d.company, region: d.region, services: d.services }
        : { source: d.source }),
    });
  }

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
