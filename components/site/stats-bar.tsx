'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Globe2, Leaf, Layers, ShieldCheck } from 'lucide-react';
import { useLang } from '@/components/providers/language-provider';

const ICONS = [Layers, Globe2, Leaf, ShieldCheck];

export function StatsBar() {
  const { t } = useLang();

  return (
    <section className="surface-navy on-navy border-y border-white/10">
      <div className="container relative section-sm">
        <h2 className="sr-only">{t.stats.heading}</h2>

        <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.items.map((item, i) => {
            const Icon = ICONS[i] ?? Layers;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-navy-800 p-6 transition-colors hover:bg-navy-700"
              >
                <Icon className="mb-4 h-5 w-5 text-emerald-400" strokeWidth={1.75} aria-hidden="true" />

                {item.value ? (
                  <div className="font-display text-4xl font-extrabold tracking-tight text-white">
                    <Counter to={Number(item.value)} />
                    <span className="text-emerald-400">{item.suffix}</span>
                  </div>
                ) : (
                  <div className="h-1 w-10 rounded-full bg-bridge-grad" />
                )}

                <p className="mt-3 text-sm font-semibold leading-snug text-white">{item.label}</p>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-400">{item.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
