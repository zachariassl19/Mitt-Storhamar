import type { ArchiveEuropeCampaign } from './types'

const verifiedAt = '2026-09-28'

export const europe1996Detail: ArchiveEuropeCampaign[] = [
  {
    id: 'europe-1996-97',
    title: 'Europa Cup 1996/97',
    slug: 'europa-cup-1996-97',
    summary: 'Storhamars første offisielle kamp i utlandet endte med 7–5-seier over Sheffield Steelers. Laget ble nummer tre i semifinalepuljen i Hämeenlinna.',
    body: [
      '8. november 1996 spilte Storhamar sin første offisielle kamp utenfor Norge. Sheffield Steelers ble slått 7–5 i Hämeenlinna, en milepæl SIL-arkivet trekker fram i klubbhistorien.',
      'I kamp nummer to spilte Storhamar 1–1 mot Polymir Novopolotsk. Avslutningen mot vertslaget HPK Hämeenlinna endte med 0–3-tap.',
      'HPK vant gruppa med fem poeng. Polymir og Storhamar endte begge på tre poeng; Storhamar ble nummer tre med 8–9 i målforskjell. SIL-arkivet fører sesongen som Europacup-semifinale.',
    ],
    completeness: 'verified',
    sources: ['silarkivet', 'iihf'],
    media: [],
    related: [
      { kind: 'season', id: 'season-1996-97' },
      { kind: 'jersey', id: 'jersey-season-1996-97' },
    ],
    seasonId: 'season-1996-97',
    competition: 'IIHF European Cup',
    stage: 'Semifinalepulje i Hämeenlinna',
    opponentNames: ['Sheffield Steelers', 'Polymir Novopolotsk', 'HPK Hämeenlinna'],
    gameIds: [],
    outcome: '3. plass i gruppa: seier 7–5 mot Sheffield, 1–1 mot Polymir og 0–3 mot HPK.',
    lastVerifiedAt: verifiedAt,
  },
]
