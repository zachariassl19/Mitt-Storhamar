import type { ArchivePerson } from './types'

type PositionGroup = 'Keeper' | 'Back' | 'Forward'

/**
 * Posisjonskontroll (06.10.2026). Navn er de som står i vårt researchregister,
 * ikke nødvendigvis standardnavnet hos databasen.
 * Kilde: https://www.eliteprospects.com/team/181/storhamar/2025-2026
 *        https://www.eliteprospects.com/team/181/storhamar/2024-2025
 * Brukes bare hvis spillerprofilen ennå ikke har en mer presis posisjon.
 * Ukjente spillere skal ikke gjøres til "forward" som en standardverdi.
 */
export const verifiedRosterPositions: Record<string, PositionGroup> = {
  'Markus Stensrud': 'Keeper',
  'Trym Gran': 'Keeper',
  'Henrik Fayen-Vestavik': 'Keeper',
  'Amund Søndmør Martinsen': 'Keeper',
  'Stefan Espeland': 'Back',
  'Sander Hurrød': 'Back',
  'Sverre Rønningen': 'Back',
  'Andreas Hjelm': 'Back',
  'Joe Gatenby': 'Back',
  'Amil Krupic': 'Back',
  'Christian Bull': 'Back',
  'Mathias Papuga': 'Back',
  'Adrian Saxrud-Danielsen': 'Back',
  'Jakub Kindl': 'Back',
  'Villiam Strøm': 'Back',
  'Peter Quenneville': 'Forward',
  'Eirik Salsten': 'Forward',
  'Jacob Berglund': 'Forward',
  'Martin Johnsen': 'Forward',
  'Andreas Martinsen': 'Forward',
  'Andreas Dahl': 'Forward',
  'Samuel Solem': 'Forward',
  'Martin Rønnild': 'Forward',
  'Kenneth Pappalardo': 'Forward',
  'Marcus Bryhnisveen': 'Forward',
  'Jacob Lundell Noer': 'Forward',
  'Magnus Mjørud': 'Forward',
  'Axel Sandnes': 'Forward',
  'Ole Indergaard': 'Forward',
  'Cole Schneider': 'Forward',
  'Håvard Salsten': 'Forward',
  'Austin Cangelosi': 'Forward',
  'Victor Svensson': 'Forward',
  'Mats Bakke Olsen': 'Forward',
  'David Aas-Larsen': 'Forward',
  'Linus Morken': 'Forward',
  'Zach O’Brien': 'Forward',
  'Colin Campbell': 'Forward',
  'Olle Liss': 'Forward',
  'Isac Skedung': 'Forward',
  'Oliver Nilsgård': 'Forward',
}

/**
 * Spillerportrretter med kjent kilde fra SIL-arkivet, uten å hente fra EP automatisk.
 */
const sourcePhotos: Record<string, { file: string; alt: string }> = {
  'Eirik Salsten': { file: 'esalsten.jpg', alt: 'Eirik Salsten i Storhamar-drakt' },
  'Cole Schneider': { file: 'cschneider.jpg', alt: 'Cole Schneider i Storhamar-drakt' },
}

export function withRosterEvidence(players: ArchivePerson[]): ArchivePerson[] {
  return players.map((player) => {
    const position = verifiedRosterPositions[player.fullName]
    const photo = sourcePhotos[player.fullName]
    const updated = { ...player }

    if (!updated.position && position) updated.position = position === 'Forward' ? 'Løper' : position

    if (photo && !updated.media.length) {
      updated.media = [{
        id: `media-${player.id}-sil-portrait`,
        type: 'photo',
        src: `https://i0.wp.com/silarkivet.no/wp-content/uploads/${photo.file}?resize=600%2C408`,
        alt: photo.alt,
        caption: photo.alt,
        credit: 'SIL-arkivet',
        sourceId: 'silarkivet',
        sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
        personIds: [player.id],
        rightsNote: 'Historisk portrett fra SIL-arkivet. Materialbruk iht. avklart kildeavtale.',
      }]
    }

    return updated
  })
}
