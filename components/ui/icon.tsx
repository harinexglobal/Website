'use client';

import {
  Atom,
  Award,
  BookOpen,
  Building2,
  ClipboardList,
  Cpu,
  Dna,
  Factory,
  FlaskConical,
  Globe,
  GraduationCap,
  Handshake,
  Languages,
  Layers,
  Leaf,
  Monitor,
  Plane,
  Route,
  ShieldCheck,
  Stethoscope,
  TestTubes,
  Users,
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
  'test-tube': TestTubes,
  dna: Dna,
  stethoscope: Stethoscope,
  cpu: Cpu,
  leaf: Leaf,
  'graduation-cap': GraduationCap,

  /* Navigation. Added because the mega menu asked for names the map did not
     have, and the fallback below is silent — every one of them rendered as an
     atom, so seven different menu entries wore the same glyph. */
  layers: Layers,
  route: Route,
  award: Award,
  globe: Globe,
  book: BookOpen,
  users: Users,
  building: Building2,
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
  /* Falling back silently is what hid the missing names above. Kept for
     resilience, but add the icon to ICONS rather than relying on it. */
  const Cmp = ICONS[name] ?? Atom;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
