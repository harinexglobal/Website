import { z } from 'zod';

/**
 * Shared between the client form and the /api/inquiry route handler, so the
 * server never trusts the browser's validation.
 *
 * Messages are keys rather than sentences — the client swaps in the localised
 * string from lib/content.ts, and the server returns the key.
 */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'name'),
  email: z.string().trim().email('email'),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().min(2, 'company'),
  region: z.enum(['taiwan', 'india', 'other'], { message: 'region' }),
  services: z.array(z.string()).min(1, 'service'),
  brief: z.string().trim().min(20, 'brief').max(4000),
  /* Honeypot — real users never fill this. */
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

/**
 * Short form embedded at the foot of each capability page. Deliberately three
 * fields — the full form lives on /contact. `source` records which capability
 * the enquiry came from so the lead can be routed.
 */
export const quickInquirySchema = z.object({
  name: z.string().trim().min(2, 'name'),
  email: z.string().trim().email('email'),
  message: z.string().trim().min(10, 'message').max(2000),
  source: z.string().trim().max(64).optional(),
  website: z.string().max(0).optional(),
});

export type QuickInquiryInput = z.infer<typeof quickInquirySchema>;

export const REGION_VALUES = ['taiwan', 'india', 'other'] as const;
export const SERVICE_VALUES = [
  'tech-transfer',
  'sourcing',
  'translation',
  'market-entry',
  'regulatory',
] as const;
