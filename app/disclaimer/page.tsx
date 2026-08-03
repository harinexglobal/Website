import type { Metadata } from 'next';
import { LegalContent } from '@/components/pages/legal-content';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'The limits of the information on this website: general guidance only, no legal or financial advice, and what our references to TFDA, CDSCO, ISO 13485, REACH and ZDHC do and do not mean.',
  alternates: { canonical: '/disclaimer' },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return <LegalContent doc="disclaimer" />;
}
