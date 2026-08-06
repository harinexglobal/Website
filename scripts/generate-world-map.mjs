/**
 * Pre-renders a world map to a single SVG path string.
 *
 * Run at build time, never in the browser: world-atlas and topojson-client are
 * devDependencies, and the site ships only the generated `d` attribute. That
 * keeps an accurate coastline on the page for a few KB of text rather than a
 * mapping library and a topology file.
 *
 * Projection is plain equirectangular (lon/lat -> x/y), which is what the node
 * placement in network-map.tsx uses too, so pins land where they should.
 *
 * Run with: node scripts/generate-world-map.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { feature } from 'topojson-client';

const WIDTH = 900;
const HEIGHT = 420;

// Antarctica is a projection artefact at the bottom of every equirectangular
// map and adds nothing here — clipping the far south also lets the useful
// latitudes fill more of the frame.
const LAT_TOP = 84;
const LAT_BOTTOM = -58;

/** Equirectangular. Shared with network-map.tsx — keep the two in step. */
function project([lon, lat]) {
  const x = ((lon + 180) / 360) * WIDTH;
  const y = ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * HEIGHT;
  return [x, y];
}

const topo = JSON.parse(readFileSync('node_modules/world-atlas/land-110m.json', 'utf8'));
const land = feature(topo, topo.objects.land);

const round = (n) => Math.round(n * 10) / 10;

function ringToPath(ring) {
  let out = '';
  let prev = null;
  for (const point of ring) {
    const [x, y] = project(point);
    // Drop points that round to the same place — at 110m resolution this
    // removes a lot of path data with no visible difference.
    if (prev && Math.abs(x - prev[0]) < 0.35 && Math.abs(y - prev[1]) < 0.35) continue;
    out += `${out ? 'L' : 'M'}${round(x)},${round(y)}`;
    prev = [x, y];
  }
  return out ? `${out}Z` : '';
}

// topojson `feature()` returns a Feature for a single geometry and a
// FeatureCollection for a GeometryCollection — land-110m is the latter.
const geometries =
  land.type === 'FeatureCollection' ? land.features.map((f) => f.geometry) : [land.geometry];

const parts = [];
for (const geometry of geometries) {
  const polygons =
    geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates];
  for (const polygon of polygons) {
    for (const ring of polygon) {
      const p = ringToPath(ring);
      if (p) parts.push(p);
    }
  }
}

const d = parts.join('');

const out = `/**
 * GENERATED — do not edit by hand.
 * Run: node scripts/generate-world-map.mjs
 *
 * Land outline at 110m resolution, equirectangular, clipped to
 * ${LAT_TOP}..${LAT_BOTTOM} degrees latitude, projected into a ${WIDTH}x${HEIGHT} viewBox.
 */
export const WORLD_VIEWBOX = { width: ${WIDTH}, height: ${HEIGHT} };
export const WORLD_LAT_TOP = ${LAT_TOP};
export const WORLD_LAT_BOTTOM = ${LAT_BOTTOM};

/** Longitude/latitude to viewBox coordinates. */
export function projectLonLat(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * ${WIDTH},
    y: ((${LAT_TOP} - lat) / (${LAT_TOP} - ${LAT_BOTTOM})) * ${HEIGHT},
  };
}

export const WORLD_PATH =
  '${d}';
`;

writeFileSync('lib/world-map.ts', out);
console.log(`lib/world-map.ts written — ${parts.length} rings, ${(d.length / 1024).toFixed(1)} KB of path data`);
