import type { Metadata } from 'next';
import { InsightsContent } from '@/components/pages/insights-content';

export const metadata: Metadata = {
  title: 'Case Studies & Insights',
  description:
    'Practical notes on cross-border technology transfer, supplier qualification, market entry and technical localisation across our markets.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  return <InsightsContent />;
}
