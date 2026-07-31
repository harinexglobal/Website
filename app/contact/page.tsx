import type { Metadata } from 'next';
import { ContactContent } from '@/components/pages/contact-content';

export const metadata: Metadata = {
  title: 'Contact & Project Inquiry',
  description:
    'Start a conversation with HariNext Global. Offices in Taipei, Taiwan and a representative desk in Chennai, India.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactContent />;
}
