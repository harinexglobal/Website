import type { Metadata } from 'next';
import { LegalContent } from '@/components/pages/legal-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What personal data HariNex Global collects through this website, why we collect it, who we share it with, and the rights you have over it.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalContent doc="privacy" />;
}
