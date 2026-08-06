import type { Metadata } from 'next';
import { BridgeContent } from '@/components/pages/bridge-content';

export const metadata: Metadata = {
  title: 'Global Markets — Taiwan to the World',
  description:
    'Where HariNex Global operates and why. Headquartered in Taiwan, running the same model into seven markets across Asia, Europe, North America and Oceania.',
  alternates: { canonical: '/markets' },
};

export default function MarketsPage() {
  return <BridgeContent />;
}
