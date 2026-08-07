import type { Metadata } from 'next';
import { CollaboratorsContent } from '@/components/pages/collaborators-content';

export const metadata: Metadata = {
  title: 'Collaborators — Organisations We Work With',
  description:
    'The companies currently working with HariNex Global and what each engagement involves, across the markets we operate in.',
  alternates: { canonical: '/markets/collaborators' },
};

export default function CollaboratorsPage() {
  return <CollaboratorsContent />;
}
