import type { Metadata } from 'next';
import { TeamContent } from '@/components/pages/team-content';

export const metadata: Metadata = {
  title: 'Our Team — Leadership & Global Team',
  description:
    'The people behind HariNex Global: company leadership in Taiwan and India, and a global team across South Korea, North America, Germany, Singapore and Australia.',
  alternates: { canonical: '/who-we-are/team' },
};

export default function TeamPage() {
  return <TeamContent />;
}
