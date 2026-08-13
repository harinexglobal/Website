import type { Metadata } from 'next';
import { IndustriesContent } from '@/components/pages/industries-content';

export const metadata: Metadata = {
  title: 'Industries — Specialty Chemicals, Biotech, Medical Devices & Semiconductors',
  description:
    'Sectors where technical depth decides the outcome: specialty and green chemicals, biotech and pharmaceuticals, medical devices, electronics and semiconductor materials, and sustainable technology.',
  alternates: { canonical: '/what-we-do/industries' },
};

export default function IndustriesPage() {
  return <IndustriesContent />;
}
