/**
 * Storhamar season navigation at Elite Prospects.
 *
 * Team pages from 1969/70 onward use /team/181/storhamar/YYYY-YYYY;
 * confirmed examples include 1969/70, 1970/71, 1980/81, 1995/96 and 2025/26.
 * Some older season pages contain no roster even when the route exists.
 * For earlier years, link to the team page instead of guessing an old URL.
 * Current season is shown on the canonical team URL.
 *
 * This creates links only. It does not import, scrape or verify statistics.
 */
export const ELITE_PROSPECTS_STORHAMAR_URL =
  'https://www.eliteprospects.com/team/181/storhamar'

export interface EliteProspectsSeasonLink {
  url: string
  directSeason: boolean
}

export function eliteProspectsSeasonLink(startYear: number): EliteProspectsSeasonLink {
  if (!Number.isInteger(startYear) || startYear < 1969 || startYear >= 2026) {
    return { url: ELITE_PROSPECTS_STORHAMAR_URL, directSeason: false }
  }
  return {
    url: `${ELITE_PROSPECTS_STORHAMAR_URL}/${startYear}-${startYear + 1}`,
    directSeason: true,
  }
}

export function seasonDisplayName(startYear: number): string {
  return `${startYear}/${String(startYear + 1).slice(-2)}`
}
