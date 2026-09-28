import type { ArchiveHonour, ArchiveLegend, ArchiveSeason, ArchiveTimelineEvent } from './types'

const verifiedAt = '2026-09-28'

export function resolveSeasonResearch(season: ArchiveSeason): ArchiveSeason {
  if (season.id === 'season-2023-24') {
    return {
      ...season,
      body: [
        'Storhamar dominerte den første EHL-sesongen og sikret klubbens niende seriemesterskap med 10–0 hjemme mot Comet 22. februar 2024. Datoen er bekreftet både av Storhamar Hockey og klubbens historiske gjennomgang av seriegullene.',
        ...(season.body?.slice(1) ?? []),
      ],
      lastVerifiedAt: verifiedAt,
    }
  }

  if (season.id === 'season-2025-26') {
    return {
      ...season,
      body: [
        'Storhamar vant EHL for tredje sesong på rad. Seriegullet ble sikret med 5–0 borte mot Lørenskog 26. februar 2026. Storhamar Hockey publiserte kamp- og gullsaken samme dato og løser dermed det tidligere datoavviket i SIL-arkivets milepælsoversikt.',
        ...(season.body?.slice(1) ?? []),
      ],
      lastVerifiedAt: verifiedAt,
    }
  }

  return season
}

export function resolveHonourResearch(honour: ArchiveHonour): ArchiveHonour {
  if (honour.id === 'honour-2024-league') {
    return {
      ...honour,
      completeness: 'verified',
      body: ['Seriegullet ble sikret med 10–0 hjemme mot Comet 22. februar 2024. Storhamar Hockey bekrefter datoen i både samtidssak og den senere historiske gjennomgangen av klubbens seriemesterskap.'],
      decidingGame: 'Storhamar – Comet 10–0, 22.02.2024',
      sources: Array.from(new Set([...honour.sources, 'storhamar-official'])),
      lastVerifiedAt: verifiedAt,
    }
  }

  if (honour.id === 'honour-2026-league') {
    return {
      ...honour,
      completeness: 'verified',
      body: ['Storhamar sikret seriemesterskapet med 5–0 borte mot Lørenskog 26. februar 2026. Storhamar Hockey publiserte gullsaken 26. februar og bekrefter datoen.'],
      decidingGame: 'Lørenskog – Storhamar 0–5, 26.02.2026',
      sources: Array.from(new Set([...honour.sources, 'storhamar-official'])),
      lastVerifiedAt: verifiedAt,
    }
  }

  return honour
}

export function resolveLegendResearch(legend: ArchiveLegend): ArchiveLegend {
  if (legend.id !== 'legend-christian-larrivee') return legend

  return {
    ...legend,
    summary: '«Talismanen» – tolv Storhamar-sesonger og nummer 23 hedret med blått banner 27. august 2022.',
    body: [
      'Christian Larrivée spilte først for Storhamar i 2006/07 og kom tilbake i 2010. Over en lang andreperiode ble han en av klubbens mest profilerte og lojale utenlandske spillere.',
      'En eldre milepælsoversikt daterte hedringen til august 2021, men SIL-arkivets detaljerte testimonialkilde beskriver at covid-19 utsatte arrangementet og at det blå banneret med bilde og nummer 23 faktisk gikk i taket etter testimonialkampen 27. august 2022.',
      'Den detaljerte arrangementsbeskrivelsen brukes derfor som den mest presise kilden for datoen, mens det eldre avviket beholdes dokumentert i researchloggen.',
    ],
    completeness: 'verified',
    honouredAt: '2022-08-27',
    lastVerifiedAt: verifiedAt,
  }
}

export function resolveTimelineResearch(event: ArchiveTimelineEvent): ArchiveTimelineEvent {
  if (event.id === 'timeline-larrivee-number-23') {
    return {
      ...event,
      summary: '27. august 2022 gikk det blå banneret med Christian Larrivées bilde og nummer 23 i taket etter hans utsatte testimonialkamp.',
      body: ['Den detaljerte testimonialoversikten dokumenterer selve bannerhevingen og brukes som presis datering. Den eldre milepælsoversiktens «august 2021» behandles som et historisk kildeavvik.'],
      completeness: 'verified',
      date: '2022-08-27',
      year: 2022,
      lastVerifiedAt: verifiedAt,
    }
  }

  if (event.id === 'timeline-2024-league') {
    return {
      ...event,
      summary: '22. februar 2024 slo Storhamar Comet 10–0 og sikret klubbens niende seriemesterskap.',
      completeness: 'verified', date: '2024-02-22', sources: Array.from(new Set([...event.sources, 'storhamar-official'])), lastVerifiedAt: verifiedAt,
    }
  }

  if (event.id === 'timeline-2026-league') {
    return {
      ...event,
      summary: '26. februar 2026 slo Storhamar Lørenskog 5–0 borte og sikret klubbens ellevte seriemesterskap.',
      completeness: 'verified', date: '2026-02-26', sources: Array.from(new Set([...event.sources, 'storhamar-official'])), lastVerifiedAt: verifiedAt,
    }
  }

  return event
}
