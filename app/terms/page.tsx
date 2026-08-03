import type { Metadata } from 'next';
import { LegalContent } from '@/components/pages/legal-content';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms governing use of the HariNex Global website, including intellectual property, confidentiality of enquiries, limitation of liability and governing law.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <LegalContent doc="terms" />;
}
