import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/about-content';

export const metadata: Metadata = {
  title: 'About Us — The Taiwan–India Bilateral Bridge',
  description:
    'HariNext Global closes the gap between where advanced technology is developed and where it can be built at scale. Bilateral leadership across Taiwan and India.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutContent />;
}
