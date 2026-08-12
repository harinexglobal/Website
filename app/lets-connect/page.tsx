import type { Metadata } from 'next';
import { LetsConnectContent } from '@/components/pages/lets-connect-content';

export const metadata: Metadata = {
  title: "Let's Connect — Business, Partner and Investor Enquiries",
  description:
    'Three routes into HariNex Global: a business enquiry about a technology, supplier or market; a partner enquiry about working alongside us; or an investor enquiry to the board.',
  alternates: { canonical: '/lets-connect' },
};

export default function LetsConnectPage() {
  return <LetsConnectContent />;
}
