import type { Metadata } from 'next';
import { HowWeHelpContent } from '@/components/pages/how-we-help-content';

export const metadata: Metadata = {
  title: 'How We Help — Market Entry, Technology Transfer & Partnerships',
  description:
    'The three ways an engagement usually starts: entering a new market, moving a technology, or finding a partner or supplier — and the practices each one draws on.',
  alternates: { canonical: '/how-we-help' },
};

export default function HowWeHelpPage() {
  return <HowWeHelpContent />;
}
