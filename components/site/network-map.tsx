'use client';

import { useReducedMotion } from 'framer-motion';
import { useLang } from '@/components/providers/language-provider';
import { WORLD_PATH, WORLD_VIEWBOX, projectLonLat } from '@/lib/world-map';

/**
 * The network on a real world map.
 *
 * The coastline is a pre-rendered path (see scripts/generate-world-map.mjs) —
 * real 110m land data, equirectangular, generated at build time. No mapping
 * library ships to the browser; the page carries a path string.
 *
 * Nodes are placed by actual longitude and latitude through the same
 * projection, so Taiwan sits where Taiwan is. Arcs are computed from those
 * positions rather than hand-drawn, which means adding a market to the content
 * layer with a COORDS entry puts it on the map, correctly placed, with a
 * working route.
 *
 * SMIL <animateMotion> drives the arrowheads: it follows an arbitrary path and
 * orients to the tangent via rotate="auto", which CSS cannot do.
 */

/** Real coordinates, keyed by location id. */
const COORDS: Record<string, { lon: number; lat: number }> = {
  taipei: { lon: 121.3, lat: 24.99 }, // Guishan, labelled Taipei
  bengaluru: { lon: 77.59, lat: 12.97 },
  michigan: { lon: -85.6, lat: 44.31 },
  seoul: { lon: 126.98, lat: 37.57 },
  germany: { lon: 8.4, lat: 49.01 }, // Karlsruhe
  singapore: { lon: 103.82, lat: 1.35 },
  australia: { lon: 134.0, lat: -25.27 },
};

/**
 * Label placement per node. The eastern markets cluster tightly — Taipei,
 * Seoul, Singapore and Australia sit within a few degrees of each other — so
 * these are set by hand rather than all defaulting to "above".
 */
const LABELS: Record<string, { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }> = {
  michigan: { dx: 0, dy: -16, anchor: 'middle' },
  germany: { dx: 0, dy: -16, anchor: 'middle' },
  bengaluru: { dx: -12, dy: 5, anchor: 'end' },
  singapore: { dx: 0, dy: 24, anchor: 'middle' },
  seoul: { dx: 0, dy: -17, anchor: 'middle' },
  australia: { dx: 0, dy: 24, anchor: 'middle' },
};

/** Arc from the hub, bowed perpendicular to the straight line. */
function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  // Bow scales with distance so short hops stay shallow and long hauls sweep.
  const lift = Math.min(70, len * 0.22);
  const cx = mx + (-dy / len) * lift;
  const cy = my + (dx / len) * lift;
  return `M${from.x.toFixed(1)},${from.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
}

export function NetworkMap() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  /** "Singapore, Singapore" reads as a mistake — collapse city == country. */
  const label = (city: string, country: string) =>
    city === country ? country : `${city}, ${country}`;

  const hubLoc = t.network.locations.find((l) => l.type === 'hq');
  const hubCoord = hubLoc ? COORDS[hubLoc.id] : undefined;
  const hub = hubCoord ? projectLonLat(hubCoord.lon, hubCoord.lat) : { x: 753, y: 174 };

  const markets = t.network.locations
    .filter((l) => l.type !== 'hq' && COORDS[l.id])
    .map((l, i) => {
      const c = COORDS[l.id];
      const p = projectLonLat(c.lon, c.lat);
      return {
        ...l,
        p,
        path: arc(hub, p),
        // Stagger so the arrows do not all leave the hub together.
        dur: 3 + (Math.hypot(p.x - hub.x, p.y - hub.y) / 900) * 4,
        delay: i * 0.55,
        lab: LABELS[l.id] ?? { dx: 0, dy: -16, anchor: 'middle' as const },
      };
    });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${WORLD_VIEWBOX.width} ${WORLD_VIEWBOX.height}`}
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
          <g id="arrowShape">
            <path d="M-5,-4 L6,0 L-5,4 Z" fill="#CFF6E2" />
          </g>
        </defs>

        {/* Land. Low contrast on purpose — it orients the eye, the routes are
            the subject. */}
        <path d={WORLD_PATH} fill="#EDEAE0" fillOpacity="0.09" stroke="#EDEAE0" strokeOpacity="0.16" strokeWidth="0.5" />

        {/* Routes */}
        {markets.map((m) => (
          <g key={`route-${m.id}`}>
            <path
              d={m.path}
              fill="none"
              stroke="url(#routeGrad)"
              strokeOpacity={m.core ? 0.85 : 0.4}
              strokeWidth={m.core ? 2 : 1.2}
              strokeDasharray={m.core ? undefined : '5 6'}
              strokeLinecap="round"
            />

            {!reduce && (
              <>
                {/* Outbound: hub -> market */}
                <use href="#arrowShape">
                  <animateMotion
                    dur={`${m.dur}s`}
                    begin={`${m.delay}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                    path={m.path}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur={`${m.dur}s`}
                    begin={`${m.delay}s`}
                    repeatCount="indefinite"
                  />
                </use>

                {/* Return: market -> hub, same path travelled backwards */}
                <use href="#arrowShape">
                  <animateMotion
                    dur={`${m.dur}s`}
                    begin={`${m.delay + m.dur / 2}s`}
                    repeatCount="indefinite"
                    rotate="auto-reverse"
                    path={m.path}
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur={`${m.dur}s`}
                    begin={`${m.delay + m.dur / 2}s`}
                    repeatCount="indefinite"
                  />
                </use>
              </>
            )}
          </g>
        ))}

        {/* Market nodes */}
        {markets.map((m) => (
          <g key={`node-${m.id}`}>
            <circle cx={m.p.x} cy={m.p.y} r="5" fill={m.core ? '#10B981' : '#E8821E'} />
            <circle
              cx={m.p.x}
              cy={m.p.y}
              r="5"
              fill="none"
              stroke={m.core ? '#10B981' : '#E8821E'}
              strokeOpacity="0.5"
              strokeWidth="1.25"
            >
              {!reduce && (
                <animate
                  attributeName="r"
                  values="5;15;5"
                  dur="3s"
                  begin={`${m.delay}s`}
                  repeatCount="indefinite"
                />
              )}
              {!reduce && (
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;0;0.5"
                  dur="3s"
                  begin={`${m.delay}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <text
              x={m.p.x + m.lab.dx}
              y={m.p.y + m.lab.dy}
              textAnchor={m.lab.anchor}
              style={{ fontSize: 12, fontWeight: 600, paintOrder: 'stroke' }}
              stroke="#0A192F"
              strokeWidth="3.5"
              strokeOpacity="0.65"
              className="fill-white"
            >
              {label(m.city, m.country)}
            </text>
          </g>
        ))}

        {/* Hub — drawn last so it sits above every route */}
        <circle cx={hub.x} cy={hub.y} r="40" fill="url(#hubGlow)" />
        <circle cx={hub.x} cy={hub.y} r="10" fill="none" stroke="#10B981" strokeOpacity="0.55" strokeWidth="1.5">
          {!reduce && <animate attributeName="r" values="10;20;10" dur="3.2s" repeatCount="indefinite" />}
          {!reduce && (
            <animate attributeName="stroke-opacity" values="0.55;0;0.55" dur="3.2s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx={hub.x} cy={hub.y} r="6" fill="#10B981" />
        <text
          x={hub.x - 14}
          y={hub.y - 12}
          textAnchor="end"
          className="fill-white"
          style={{ fontSize: 14, fontWeight: 700, paintOrder: 'stroke' }}
          stroke="#0A192F"
          strokeWidth="4"
          strokeOpacity="0.7"
        >
          {hubLoc ? label(hubLoc.city, hubLoc.country) : 'Taipei, Taiwan'}
        </text>
        <text
          x={hub.x - 14}
          y={hub.y + 4}
          textAnchor="end"
          style={{ fontSize: 10, letterSpacing: '0.12em', paintOrder: 'stroke' }}
          stroke="#0A192F"
          strokeWidth="3.5"
          strokeOpacity="0.7"
          className="fill-emerald-300 uppercase"
        >
          {t.network.hqLabel}
        </text>
      </svg>
    </div>
  );
}
