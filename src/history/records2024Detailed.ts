import type { ArchiveRecord } from './types'

const verifiedAt = '2026-09-28'
const seasonId = 'season-2023-24'

function record(args: {
  id: string
  title: string
  slug: string
  summary: string
  type: ArchiveRecord['recordType']
  value?: string | number
  unit?: string
  personIds?: string[]
}): ArchiveRecord {
  return {
    id: args.id,
    title: args.title,
    slug: args.slug,
    summary: args.summary,
    completeness: 'verified',
    sources: ['storhamar-official'],
    media: [],
    related: [{ kind: 'season', id: seasonId }],
    recordType: args.type,
    value: args.value,
    unit: args.unit,
    seasonId,
    personIds: args.personIds,
    lastVerifiedAt: verifiedAt,
  }
}

// Storhamar Hockey samlet etter NM-gullet rekordene som falt i 2023/24.
// 28 strake seire, 117 poeng og Hockey Classic-publikummet finnes allerede som
// egne hovedrekorder i historyHighlights.ts. Her bevares resten av rekordåret.
export const records2024Detailed: ArchiveRecord[] = [
  record({ id: 'record-2024-22-home-wins', title: '22 hjemmeseire i serien', slug: '2024-22-hjemmeseire', summary: 'Storhamar vant 22 hjemmekamper i seriespillet 2023/24, klubb- og ligarekord ifølge Storhamar Hockey.', type: 'season', value: 22, unit: 'hjemmeseire' }),
  record({ id: 'record-2024-20-away-wins', title: '20 borteseire i serien', slug: '2024-20-borteseire', summary: '20 borteseire i seriespillet var både klubb- og ligarekord.', type: 'season', value: 20, unit: 'borteseire' }),
  record({ id: 'record-2024-30-home-league-wins', title: '30 strake hjemmeseire i serien', slug: '2024-30-strake-hjemmeseire', summary: 'Rekka strakte seg fra desember 2022 til siste serierunde 2023/24.', type: 'streak', value: 30, unit: 'strake hjemmeseire i serien' }),
  record({ id: 'record-2024-17-away-wins-all', title: '17 strake borteseire totalt', slug: '2024-17-strake-borteseire', summary: 'Storhamar satte ny klubbrekord med 17 strake borteseire når serie og sluttspill ses samlet.', type: 'streak', value: 17, unit: 'strake borteseire' }),
  record({ id: 'record-2024-13-away-league-wins', title: '13 strake borteseire i serien', slug: '2024-13-strake-borteseire-serie', summary: 'Seriesesongen ble avsluttet med 13 borteseire på rad, ny klubbrekord på publiseringstidspunktet.', type: 'streak', value: 13, unit: 'strake borteseire i serien' }),
  record({ id: 'record-2024-nine-overtime-wins', title: 'Ni seire etter sudden death eller straffer', slug: '2024-ni-overtidsseire', summary: 'Ni serieavgjørelser etter sudden death/straffer var ny klubbrekord og tangering av ligarekorden.', type: 'season', value: 9, unit: 'OT/SO-seire' }),
  record({ id: 'record-2024-fastest-overtime-goal', title: '10 sekunder · raskeste overtidsmål', slug: '2024-raskeste-overtidsmal', summary: 'Jakub Kindl avgjorde borte mot Ringerike 11. januar bare ti sekunder inn i sudden death og forbedret klubbrekorden med 17 sekunder.', type: 'game', value: 10, unit: 'sekunder', personIds: ['player-jakub-kindl'] }),
  record({ id: 'record-2024-104-point-gap', title: '104 poeng ned til bunnlaget', slug: '2024-104-poeng-differanse', summary: 'Forskjellen mellom Storhamar og Comet var 104 poeng, omtalt av klubben som den største poengdifferansen mellom to lag i ligaen.', type: 'season', value: 104, unit: 'poeng' }),
  record({ id: 'record-2024-quenneville-powerplay-goals', title: '17 overtallsmål · Peter Quenneville', slug: '2024-quenneville-17-pp-mal', summary: 'Peter Quenneville satte klubbrekord med 17 overtallsmål i løpet av sesongen.', type: 'player', value: 17, unit: 'overtallsmål', personIds: ['player-peter-quenneville'] }),
  record({ id: 'record-2024-patrick-point-streak', title: '25 kamper på rad med poeng · Patrick Thoresen', slug: '2024-patrick-25-poengkamper', summary: 'Patrick Thoresen avsluttet rekordjakten med poeng i 25 kamper på rad, ny klubbrekord.', type: 'player', value: 25, unit: 'kamper med poeng', personIds: ['player-patrick-thoresen'] }),
  record({ id: 'record-2024-martin-johnsen-junior-points', title: '52 poeng · juniorrekord', slug: '2024-martin-johnsen-52-poeng', summary: 'Martin Johnsen satte klubbrekord for spiller i junioralder med 52 poeng totalt i serie og sluttspill.', type: 'player', value: 52, unit: 'poeng', personIds: ['player-martin-johnsen'] }),
  record({ id: 'record-2024-martin-johnsen-playoff-junior', title: '12 sluttspillpoeng · juniorrekord', slug: '2024-martin-johnsen-12-sluttspillpoeng', summary: 'Martin Johnsen satte også rekord for spiller i junioralder med 12 poeng i sluttspillet.', type: 'player', value: 12, unit: 'sluttspillpoeng', personIds: ['player-martin-johnsen'] }),
  record({ id: 'record-2024-biggest-home-win-vif', title: '8–0 · største hjemmeseier mot Vålerenga', slug: '2024-8-0-valerenga', summary: '8–0-seieren 24. januar 2024 ble klubbens største hjemmeseier mot Vålerenga.', type: 'game', value: '8–0' }),
  record({ id: 'record-2024-biggest-home-win-comet', title: '10–0 · største hjemmeseier mot Comet', slug: '2024-10-0-comet', summary: 'Seriegullkampen mot Comet endte 10–0 og ble den største Storhamar-hjemmeseieren mot klubben.', type: 'game', value: '10–0' }),
  record({ id: 'record-2024-biggest-win-ringerike', title: '9–0 · største seier mot Ringerike', slug: '2024-9-0-ringerike', summary: '9–0 ble registrert som Storhamars største seier mot Ringerike.', type: 'game', value: '9–0' }),
]

export const records2024SourceUrl = 'https://www.sil.no/alle-rekordene/'
