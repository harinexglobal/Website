import type { Metadata } from 'next';
import { TeamContent } from '@/components/pages/team-content';

export const metadata: Metadata = {
  title: 'Our Team — Leadership, Regional Directors & Advisory Board',
  description:
    'The people behind HariNex Global: company leadership in Taiwan, regional directors in India and North America, and an advisory board of practising scientists.',
  alternates: { canonical: '/about/team' },
};

export default function TeamPage() {
  return <TeamContent />;
}
