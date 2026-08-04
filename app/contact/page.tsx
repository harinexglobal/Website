import type { Metadata } from 'next';
import { ContactContent } from '@/components/pages/contact-content';

export const metadata: Metadata = {
  title: 'Contact & Project Inquiry',
  description:
    'Start a conversation with HariNex Global. Head office in Taoyuan City, Taiwan, with a branch office in Bengaluru, India.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactContent />;
}
