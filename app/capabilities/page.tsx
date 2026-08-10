import type { Metadata } from 'next';
import { CapabilitiesContent } from '@/components/pages/capabilities-content';

export const metadata: Metadata = {
  title: 'Capabilities — Technology Transfer, Sourcing, Translation & Regulatory',
  description:
    'Eight practices covering technology transfer, cross-border advisory and delegations, strategic supplier sourcing, technical translation, digital solutions, regulatory coordination, project management and industrial automation.',
  alternates: { canonical: '/capabilities' },
};

export default function CapabilitiesPage() {
  return <CapabilitiesContent />;
}
