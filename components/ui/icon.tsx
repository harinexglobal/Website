'use client';

import {
  Atom,
  ClipboardList,
  Cpu,
  Dna,
  Factory,
  FlaskConical,
  GraduationCap,
  Handshake,
  Languages,
  Leaf,
  Monitor,
  Plane,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

/** Maps the string keys stored in lib/content.ts to Lucide components. */
const ICONS: Record<string, LucideIcon> = {
  atom: Atom,
  handshake: Handshake,
  factory: Factory,
  languages: Languages,
  monitor: Monitor,
  'shield-check': ShieldCheck,
  plane: Plane,
  clipboard: ClipboardList,
  flask: FlaskConical,
  dna: Dna,
  stethoscope: Stethoscope,
  cpu: Cpu,
  leaf: Leaf,
  'graduation-cap': GraduationCap,
};

export function ContentIcon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name] ?? Atom;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
