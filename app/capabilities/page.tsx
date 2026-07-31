import type { Metadata } from 'next';
import { CapabilitiesContent } from '@/components/pages/capabilities-content';

export const metadata: Metadata = {
  title: 'Capabilities — Technology Transfer, Sourcing, Translation & Regulatory',
  description:
    'Seven practices covering technology transfer, cross-border advisory, strategic supplier sourcing, technical translation, digital solutions, regulatory coordination and trade missions.',
  alternates: { canonical: '/capabilities' },
};

export default function CapabilitiesPage() {
  return <CapabilitiesContent />;
}
