import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/about-content';

export const metadata: Metadata = {
  title: 'About Us — Building Stronger Business Connections Worldwide',
  description:
    'HariNex Global was established to bridge the gap between regional innovations and global opportunities. Headquartered in Taiwan, with representatives in India, South Korea and the United States.',
  alternates: { canonical: '/who-we-are' },
};

export default function AboutPage() {
  return <AboutContent />;
}
