import type { JerseyUsage } from './types'

/** Keep the displayed number and the filtered number buttons in sync. */
export function visibleShirtNumber(
  selected: string,
  matches: ReadonlyArray<{ number: string }>,
): string | null {
  return (matches.find((entry) => entry.number === selected) ?? matches[0])?.number ?? null
}

export interface HistoryReturnLocation {
  section: string
  selection: unknown | null
  chapterId: string | null
}

/** A detail page returns to its actual entry point, not its own entity category. */
export function historyBackLabel(origin?: HistoryReturnLocation): string {
  if (!origin) return 'Tilbake'
  if (origin.selection) return 'Tilbake til forrige oppføring'
  if (origin.chapterId) return 'Tilbake til epoken'
  const labels: Record<string, string> = {
    overview: 'Tilbake til historien',
    coach: 'Tilbake til trenere',
    captain: 'Tilbake til kapteiner',
    stories: 'Tilbake til spillerhistoriene',
    numbers: 'Tilbake til draktnumrene',
    audit: 'Tilbake til kildekontroll',
    'career-stats': 'Tilbake til adelskalenderen',
    player: 'Tilbake til spillerarkivet',
    legend: 'Tilbake til legender',
    season: 'Tilbake til sesongene',
    jersey: 'Tilbake til draktarkivet',
    arena: 'Tilbake til arenaene',
    record: 'Tilbake til rekordene',
  }
  return labels[origin.section] ?? 'Tilbake'
}

/** Fix a trailing separator in the imported SIL index display, never the source record. */
export function audienceAverageLabel(raw: string | null): string | null {
  return raw?.trim().replace(/^(\d[\d\s]*)-\s*$/, '$1') ?? null
}

export const jerseyUsageLabels: Record<JerseyUsage, string> = {
  home: 'Hjemmedrakt',
  away: 'Bortedrakt',
  third: 'Tredjedrakt',
  europe: 'Europadrakt',
  playoff: 'Sluttspill',
  preseason: 'Oppkjøring',
  special: 'Spesialdrakt',
  testimonial: 'Hyllestdrakt',
  other: 'Annet',
}
