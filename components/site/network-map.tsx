'use client';

import { useReducedMotion } from 'framer-motion';
import { useLang } from '@/components/providers/language-provider';

/**
 * Animated route diagram: arrows travel out from Taipei to each market and
 * back again, so the exchange reads as two-way rather than one-directional.
 *
 * Positions are schematic (roughly west -> east), not a true projection.
 * SMIL <animateMotion> is used rather than CSS because it can follow an
 * arbitrary path and orient the arrowhead to the tangent via rotate="auto".
 */

type Route = {
  id: string;
  d: string;
  /** Emphasised: the Taiwan–India corridor is the core business. */
  core?: boolean;
  dur: number;
  delay: number;
};

const HUB = { x: 620, y: 230 };

const NODES = [
  { id: 'michigan', x: 140, y: 140, key: 'michigan' },
  { id: 'bangalore', x: 400, y: 300, key: 'bangalore' },
  { id: 'seoul', x: 700, y: 130, key: 'seoul' },
];

const ROUTES: Route[] = [
  { id: 'to-michigan', d: 'M620,230 Q380,30 140,140', dur: 4.6, delay: 0 },
  { id: 'to-bangalore', d: 'M620,230 Q510,325 400,300', core: true, dur: 3.4, delay: 0.4 },
  { id: 'to-seoul', d: 'M620,230 Q678,158 700,130', dur: 2.8, delay: 0.9 },
];

export function NetworkMap() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const label = (key: string) => {
    const loc = t.network.locations.find((l) => l.id === key);
    return loc ? `${loc.city}, ${loc.country}` : key;
  };

  const hub = t.network.locations.find((l) => l.id === 'taipei');

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      <svg
        viewBox="0 0 900 420"
        className="h-auto w-full"
        role="img"
        aria-label={`${t.network.heading} — ${t.network.lead}`}
      >
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8821E" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <radialGradient id="hubGlow">
            <stop stopColor="#10B981" stopOpacity="0.45" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
          {/* Arrowhead pointing along +x; rotate="auto" orients it to the path. */}
          <g id="arrowShape">
            <path d="M-5,-4 L6,0 L-5,4 Z" fill="#CFF6E2" />
          </g>
        </defs>

        {/* Longitude/latitude suggestion */}
        <g stroke="#EDEAE0" strokeOpacity="0.06" strokeWidth="1">
          {[70, 140, 210, 280, 350].map((y) => (
            <line key={y} x1="20" y1={y} x2="880" y2={y} />
          ))}
          {[120, 260, 400, 540, 680, 820].map((x) => (
            <line key={x} x1={x} y1="30" x2={x} y2="390" />
          ))}
        </g>

        {/* Routes */}
        {ROUTES.map((r) => (
          <g key={r.id}>
            <path
              d={r.d}
              fill="none"
              stroke="url(#routeGrad)"
              strokeOpacity={r.core ? 0.85 : 0.4}
              strokeWidth={r.core ? 2 : 1.25}
              strokeDasharray={r.core ? undefined : '5 6'}
              strokeLinecap="round"
            />

            {!reduce && (
              <>
                {/* Outbound: Taipei -> market */}
                <use href="#arrowShape">
                  <animateMotion
                    dur={`${r.dur}s`}
                    begin={`${r.delay}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                    path={r.d}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur={`${r.dur}s`}
                    begin={`${r.delay}s`}
                    repeatCount="indefinite"
                  />
                </use>

                {/* Return: market -> Taipei, same path travelled backwards */}
                <use href="#arrowShape">
                  <animateMotion
                    dur={`${r.dur}s`}
                    begin={`${r.delay + r.dur / 2}s`}
                    repeatCount="indefinite"
                    rotate="auto-reverse"
                    path={r.d}
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur={`${r.dur}s`}
                    begin={`${r.delay + r.dur / 2}s`}
                    repeatCount="indefinite"
                  />
                </use>
              </>
            )}
          </g>
        ))}

        {/* Hub — Taipei */}
        <circle cx={HUB.x} cy={HUB.y} r="46" fill="url(#hubGlow)" />
        <circle cx={HUB.x} cy={HUB.y} r="12" fill="none" stroke="#10B981" strokeOpacity="0.55" strokeWidth="1.5">
          {!reduce && (
            <animate attributeName="r" values="12;22;12" dur="3.2s" repeatCount="indefinite" />
          )}
          {!reduce && (
            <animate attributeName="stroke-opacity" values="0.55;0;0.55" dur="3.2s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx={HUB.x} cy={HUB.y} r="7" fill="#10B981" />
        <text
          x={HUB.x}
          y={HUB.y - 26}
          textAnchor="middle"
          className="fill-white text-[15px] font-bold"
          style={{ fontSize: 15, fontWeight: 700 }}
        >
          {hub ? `${hub.city}, ${hub.country}` : 'Taipei'}
        </text>
        <text
          x={HUB.x}
          y={HUB.y + 34}
          textAnchor="middle"
          style={{ fontSize: 11, letterSpacing: '0.12em' }}
          className="fill-emerald-300 uppercase"
        >
          {t.network.hqLabel}
        </text>

        {/* Market nodes */}
        {NODES.map((n) => {
          const isCore = n.id === 'bangalore';
          return (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r="6"
                fill={isCore ? '#10B981' : '#E8821E'}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r="6"
                fill="none"
                stroke={isCore ? '#10B981' : '#E8821E'}
                strokeOpacity="0.5"
                strokeWidth="1.25"
              >
                {!reduce && (
                  <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
                )}
                {!reduce && (
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;0;0.5"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <text
                x={n.x}
                y={n.y - 18}
                textAnchor="middle"
                style={{ fontSize: 13, fontWeight: 600 }}
                className="fill-white"
              >
                {label(n.key)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
