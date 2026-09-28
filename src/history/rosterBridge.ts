import { championshipRosterResearch } from './rosterResearch'
import type { ArchivePerson, ArchiveSeason, SeasonPersonRef } from './types'

const verifiedAt = '2026-09-28'

function slugifyName(name: string) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/æ/gi, 'ae')
    .replace(/ø/gi, 'o')
    .replace(/å/gi, 'a')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function researchByPlayerName() {
  const map = new Map<string, { seasonIds: Set<string>; sourceUrls: Set<string> }>()

  for (const roster of championshipRosterResearch) {
    for (const fullName of roster.players) {
      const existing = map.get(fullName) ?? { seasonIds: new Set<string>(), sourceUrls: new Set<string>() }
      existing.seasonIds.add(roster.seasonId)
      existing.sourceUrls.add(roster.sourceUrl)
      map.set(fullName, existing)
    }
  }

  return map
}

export function buildRosterSupplementPlayers(existingPlayers: ArchivePerson[]): ArchivePerson[] {
  const existingNames = new Set(existingPlayers.map((player) => player.fullName))
  const research = researchByPlayerName()

  return [...research.entries()]
    .filter(([fullName]) => !existingNames.has(fullName))
    .map(([fullName, details]) => {
      const seasonIds = [...details.seasonIds]
      return {
        id: `player-roster-${slugifyName(fullName)}`,
        title: fullName,
        fullName,
        slug: `${slugifyName(fullName)}-storhamar`,
        summary: `${fullName} er dokumentert i Storhamars komplette spillerstall for ${seasonIds.length === 1 ? 'den aktuelle mesterskapssesongen' : `${seasonIds.length} mesterskapssesonger`}.`,
        body: [
          'Profilen er opprettet fra en komplett, kildebelagt spillerstall slik at spilleren ikke forsvinner fra sesongarkivet mens biografi og individuell statistikk fortsatt research-es.',
          'Tall, draktnummer, fødselsdata og andre personopplysninger fylles først når de er verifisert mot SIL-arkivets spillerprofil eller en annen godkjent kilde.',
        ],
        completeness: 'partial',
        sources: ['silarkivet', 'storhamar-official'],
        media: [],
        related: seasonIds.map((id) => ({ kind: 'season' as const, id })),
        seasonIds,
        honourIds: [],
        roles: ['spiller', 'stallresearch'],
        tags: ['stallresearch', ...details.sourceUrls],
        lastVerifiedAt: verifiedAt,
      }
    })
}

export function applyVerifiedRosterResearch(season: ArchiveSeason, players: ArchivePerson[]): ArchiveSeason {
  const research = championshipRosterResearch.find((entry) => entry.seasonId === season.id)
  if (!research) return season

  const playerIdByName = new Map(players.map((player) => [player.fullName, player.id]))
  const roster = research.players.reduce<SeasonPersonRef[]>((entries, fullName) => {
    const personId = playerIdByName.get(fullName)
    if (personId) entries.push({ personId, role: 'spiller' })
    return entries
  }, [])

  const missingNames = research.players.filter((fullName) => !playerIdByName.has(fullName))
  const body = [...(season.body ?? [])]

  if (missingNames.length > 0) {
    body.push(`Stallkontroll: ${missingNames.length} dokumenterte spillernavn mangler fortsatt person-ID og er derfor ikke skjult som om stallen var komplett.`)
  }

  return {
    ...season,
    body,
    roster,
    coaches: research.coaches.length > 0 ? research.coaches : season.coaches,
    tags: [
      ...(season.tags ?? []),
      `roster:${research.status}`,
      `roster-source:${research.sourceUrl}`,
    ],
  }
}
