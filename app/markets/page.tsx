import type { Metadata } from 'next';
import { BridgeContent } from '@/components/pages/bridge-content';

export const metadata: Metadata = {
  title: 'Global Markets — Taiwan, India, South Korea & North America',
  description:
    'Where HariNex Global operates and why. The Taiwan–India corridor is our core business and the majority of our work, extended into South Korea and North America under the same model.',
  alternates: { canonical: '/markets' },
};

export default function MarketsPage() {
  return <BridgeContent />;
}
