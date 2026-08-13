import { ROUTES, dictionaries, type Lang } from '@/lib/content';
import { insightsDictionaries } from '@/lib/insights';

/**
 * Site search index, built from the same dictionaries the pages render.
 *
 * There is no search service and no API call. Everything the site says fits
 * comfortably in memory — eight practices, seven sectors, seven markets, six
 * articles and a handful of pages — so the index is derived at render time
 * from the content already in the bundle. That keeps results honest by
 * construction: nothing can appear in search that is not on the site, and
 * nothing can go stale, because there is no second copy to update.
 *
 * It is built per language, so a visitor reading 繁體中文 searches Chinese.
 */

export type SearchResult = {
  id: string;
  href: string;
  title: string;
  detail: string;
  group: string;
};

/** Groups are labelled from the dictionary so the results read in-language. */
export function buildIndex(lang: Lang): SearchResult[] {
  const t = dictionaries[lang];
  const articles = insightsDictionaries[lang].articles;
  const n = t.nav;

  const entries: SearchResult[] = [];

  for (const c of t.capabilities.items) {
    entries.push({
      id: `practice-${c.id}`,
      href: `${ROUTES.whatWeDo}/${c.id}`,
      title: c.title,
      detail: c.summary,
      group: n.practicesLabel,
    });
  }

  for (const i of t.industries.items) {
    entries.push({
      id: `sector-${i.id}`,
      href: `${ROUTES.industries}#${i.id}`,
      title: i.title,
      detail: i.body,
      group: n.sectorsWeWorkIn,
    });
  }

  for (const m of t.network.locations) {
    entries.push({
      id: `market-${m.id}`,
      href: `${ROUTES.whereWeWork}#${m.id}`,
      title: `${m.city}, ${m.country}`,
      detail: m.role,
      group: n.marketsLabel,
    });
  }

  for (const a of articles) {
    entries.push({
      id: `insight-${a.id}`,
      href: `${ROUTES.insights}/${a.id}`,
      title: a.title,
      detail: a.excerpt,
      group: n.insights,
    });
  }

  for (const h of t.howWeHelp.items) {
    entries.push({
      id: `journey-${h.id}`,
      href: ROUTES.howWeHelp,
      title: h.title,
      detail: h.problem,
      group: n.howWeHelp,
    });
  }

  const pages: [string, string, string][] = [
    [ROUTES.whoWeAre, n.whoWeAre, t.about.lead],
    [ROUTES.team, n.team, t.team.lead],
    [ROUTES.whatWeDo, n.whatWeDo, t.capabilities.lead],
    [ROUTES.whereWeWork, n.whereWeWork, t.network.lead],
    [ROUTES.collaborators, n.collaborators, t.collaborators.lead],
    [ROUTES.insights, n.insights, t.insights.lead],
    [ROUTES.letsConnect, n.letsConnect, t.letsConnect.lead],
  ];
  for (const [href, title, detail] of pages) {
    entries.push({ id: `page-${href}`, href, title, detail, group: n.overviewLabel });
  }

  return entries;
}

/**
 * Scores an entry against the query.
 *
 * Every term must appear somewhere, so "taiwan regulatory" does not return
 * everything mentioning Taiwan. A term in the title outweighs one in the body,
 * and a title that starts with the term outweighs one that merely contains it —
 * searching "tech" should put Technology Transfer above an article that happens
 * to use the word.
 *
 * Deliberately not fuzzy. A near-miss that silently returns the wrong page is
 * worse than an empty result that tells the visitor to try another word.
 */
function score(entry: SearchResult, terms: string[]): number {
  const title = entry.title.toLowerCase();
  const detail = entry.detail.toLowerCase();

  let total = 0;
  for (const term of terms) {
    const inTitle = title.indexOf(term);
    const inDetail = detail.indexOf(term);
    if (inTitle === -1 && inDetail === -1) return 0;

    if (inTitle === 0) total += 10;
    else if (inTitle > 0) total += 6;
    if (inDetail !== -1) total += 1;
  }
  return total;
}

export function searchIndex(index: SearchResult[], query: string, limit = 8): SearchResult[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return index
    .map((entry) => ({ entry, s: score(entry, terms) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.entry);
}
