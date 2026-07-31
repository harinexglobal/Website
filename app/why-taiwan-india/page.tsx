import type { Metadata } from 'next';
import { BridgeContent } from '@/components/pages/bridge-content';

export const metadata: Metadata = {
  title: 'Why Taiwan & India — Two Economies That Fit Together',
  description:
    "Taiwan's manufacturing and semiconductor depth paired with India's scale, engineering talent and domestic demand. The complementary case for the bilateral corridor.",
  alternates: { canonical: '/why-taiwan-india' },
};

export default function BridgePage() {
  return <BridgeContent />;
}
