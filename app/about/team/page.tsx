import type { Metadata } from 'next';
import { TeamContent } from '@/components/pages/team-content';

export const metadata: Metadata = {
  title: 'Our Team — Leadership, Global Team & Advisory Board',
  description:
    'The people behind HariNex Global: company leadership in Taiwan, a global team across India, South Korea and North America, and a chief advisor leading technical evaluation.',
  alternates: { canonical: '/about/team' },
};

export default function TeamPage() {
  return <TeamContent />;
}
