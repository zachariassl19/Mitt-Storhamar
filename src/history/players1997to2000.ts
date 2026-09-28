import type { ArchivePerson } from './types'

const verifiedAt = '2026-09-28'

// Separate verified player file so season/merit links can be corrected independently
// as the late-90s archive research is reconciled against SIL-arkivet.
export const verifiedPlayers1997To2000: ArchivePerson[] = [
  {
    id: 'player-tomas-berg',
    title: 'Tomas Berg',
    fullName: 'Tomas Berg',
    slug: 'tomas-berg',
    summary: 'Den lille svenske «Mini» satte farge på Storhamar med teknikk, kreativitet og avgjørende mål i EHL og sluttspill.',
    body: [
      'Berg kom til Storhamar i 1997 som del av den store svenskebølgen etter Bosmandommen. Han scoret sitt første Storhamar-mål da han avgjorde EHL-debuten mot SC Bern på straffer.',
      'I 1998/99 ble han sesongens poengkonge i SIL-arkivets hovedoversikt. I den andre NM-finalen mot Vålerenga i 1999 sto han bak fem av Storhamars seks mål.',
    ],
    completeness: 'verified',
    sources: ['silarkivet'],
    media: [],
    related: [
      { kind: 'europe', id: 'europe-1997-98-ehl' },
      { kind: 'season', id: 'season-1998-99' },
    ],
    born: '1965-01-25',
    birthPlace: 'Bromma',
    nationality: 'Sverige',
    position: 'Løper',
    shirtNumbers: [24],
    storhamarPeriods: [{ fromSeasonId: 'season-1997-98', toSeasonId: 'season-1998-99' }],
    seasonIds: ['season-1997-98', 'season-1998-99'],
    honourIds: [],
    roles: ['spiller'],
    lastVerifiedAt: verifiedAt,
  },
  {
    id: 'player-joakim-persson',
    title: 'Joakim Persson',
    fullName: 'Joakim Persson',
    slug: 'joakim-persson',
    summary: 'Hardtarbeidende svensk ving som kom til Storhamar i 1997 og senere vendte tilbake for en ny periode på Hamar.',
    body: [
      'Persson kom fra Östervåla og ble kjent for høy innsats og lojalitet. Første Storhamar-periode var 1997/98 og 1998/99.',
      'Han var derfor ikke i Storhamar-stallen da klubben tok NM-gull våren 2000. Persson kom tilbake fra 2000/01. I Continental Cup-semifinalen mot Dukla Trenčín i 1998 scoret han Storhamars mål i 1–2-tapet.',
    ],
    completeness: 'verified',
    sources: ['silarkivet'],
    media: [],
    related: [
      { kind: 'europe', id: 'europe-1998-99-continental-cup' },
      { kind: 'season', id: 'season-1998-99' },
    ],
    born: '1974-07-09',
    birthPlace: 'Uppsala',
    nationality: 'Sverige',
    position: 'Løper',
    shirtNumbers: [14, 25, 44],
    storhamarPeriods: [
      { fromSeasonId: 'season-1997-98', toSeasonId: 'season-1998-99' },
      { fromSeasonId: 'season-2000-01', toSeasonId: 'season-2004-05' },
    ],
    seasonIds: ['season-1997-98', 'season-1998-99'],
    honourIds: [],
    roles: ['spiller'],
    lastVerifiedAt: verifiedAt,
  },
]
