/**
 * Rules for the optional file on the enquiry form.
 *
 * Shared by the browser and the route handler so the two cannot disagree. The
 * browser check exists to give the visitor a useful message; the server check
 * is the one that matters, because anything the browser enforces can be
 * skipped by posting directly.
 *
 * Size: Netlify caps a synchronous function's request body at 6 MB, and
 * multipart framing plus the rest of the form eat into that. 4 MB leaves
 * headroom — an upload that squeaks past the browser only to be rejected by
 * the platform with an opaque error is worse than one refused up front.
 *
 * Types: an extension allowlist, not a denylist. The reported MIME type comes
 * from the browser and is trivially forged, so it is advisory only. The real
 * safety property is what happens to the file afterwards: it is never written
 * to disk, never unpacked and never executed — it is read into memory and
 * attached to an email. A hostile file is only dangerous to whoever opens it,
 * which is why the archive formats people genuinely send are allowed and the
 * executable ones are not.
 */
export const ATTACHMENT_MAX_BYTES = 4 * 1024 * 1024;

export const ATTACHMENT_EXTENSIONS = [
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'txt',
  'csv',
  'png',
  'jpg',
  'jpeg',
  'webp',
  'zip',
] as const;

/** For the file picker's `accept`, which is a hint to the OS dialog only. */
export const ATTACHMENT_ACCEPT = ATTACHMENT_EXTENSIONS.map((e) => `.${e}`).join(',');

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extensionOf(filename: string): string {
  const i = filename.lastIndexOf('.');
  return i === -1 ? '' : filename.slice(i + 1).toLowerCase();
}

export type AttachmentRejection = 'size' | 'type';

/** Returns null when the file is acceptable. */
export function checkAttachment(file: {
  name: string;
  size: number;
}): AttachmentRejection | null {
  if (file.size > ATTACHMENT_MAX_BYTES) return 'size';
  if (!(ATTACHMENT_EXTENSIONS as readonly string[]).includes(extensionOf(file.name))) return 'type';
  return null;
}

/**
 * Strips directory separators, control characters and anything else that has
 * no business in a filename before it becomes an email attachment name.
 *
 * A name like `../../etc/passwd` is harmless here — nothing writes the file —
 * but it would be handed to whatever the recipient's mail client does on save,
 * and CR/LF in a filename is a header-injection primitive in some encoders.
 */
export function safeFilename(name: string): string {
  const base = name.replace(/^.*[\\/]/, '');
  const cleaned = base
    /* Control characters, DEL, and the characters Windows reserves. Written
       as escapes: the first version embedded the raw control bytes in the
       source, where no reviewer can see them. */
    .replace(/[\u0000-\u001f\u007f<>:"\\\/|?*]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();
  return (cleaned || 'attachment').slice(0, 120);
}
