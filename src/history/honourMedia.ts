import type { ArchiveHonour, ArchiveMedia } from './types'

const rightsNote = 'Offisielt klubbilde brukt som historisk referanse. Rettighetsstatus må følges opp før eventuell lokal kopiering eller videre distribusjon.'
const defaultNmSourceUrl = 'https://www.sil.no/historietirsdag-10-gull/'

interface HonourPhoto {
  src: string
  alt: string
  caption: string
  sourceUrl?: string
}

const honourPhotos: Record<string, HonourPhoto> = {
  'honour-1995-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2025/03/mestern-gulljubel-1024x683.jpg',
    alt: 'Storhamars første NM-gull i 1995',
    caption: 'Gulljubel i 1995 da Storhamar tok klubbens første kongepokal.',
  },
  'honour-1996-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2025/03/nm-gull-1996-1024x683.jpg',
    alt: 'Storhamar feirer NM-gullet i 1996',
    caption: 'Storhamar fulgte opp førstegullet med nytt NM-gull i 1996.',
  },
  'honour-1997-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2025/04/jim-marthinsen-10-pokal-97-1024x683.jpg',
    alt: 'Jim Marthinsen og Storhamars NM-gull i 1997',
    caption: 'Jim Marthinsen med pokalen etter tredje strake NM-gull i 1997.',
  },
  'honour-2000-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2025/01/olsen-og-dahlstrom-gull-2000-1024x672.jpg',
    alt: 'Tom Erik Olsen og Ole Eskild Dahlstrøm feirer NM-gullet i 2000',
    caption: 'Gulljubel etter Storhamars fjerde NM-tittel i 2000.',
  },
  'honour-2004-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2024/03/smithurst-04-1024x688.jpg',
    alt: 'Michael Smithurst under NM-finalen i 2004',
    caption: 'Michael Smithurst ble den usannsynlige helten i det dramatiske NM-gullet i 2004.',
  },
  'honour-2008-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2025/03/magic-08-1024x683.jpg',
    alt: 'Storhamar feirer NM-gullet i 2008',
    caption: 'Storhamar slo tilbake som underdog og tok kongepokalen i 2008.',
  },
  'honour-2018-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2026/04/larruvee-pokal-18-1024x683.jpg',
    alt: 'Christian Larrivée med pokalen etter NM-gullet i 2018',
    caption: 'NM-gullet i 2018 avsluttet ti års ventetid på ny kongepokal.',
  },
  'honour-2024-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2024/04/patrick-pokal-1024x682.jpg',
    alt: 'Patrick Thoresen med kongepokalen i 2024',
    caption: 'Patrick Thoresen med kongepokalen etter Storhamars NM-gull i 2024.',
  },
  'honour-2025-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2025/04/gullgutta-25-1024x683.jpg',
    alt: 'Storhamar feirer NM-gullet i 2025',
    caption: 'Gullaget i 2025 etter et perfekt sluttspill med 12 strake seire.',
  },
  'honour-2026-nm': {
    src: 'https://www.sil.no/wp-content/uploads/2026/04/botte-champagne-finale-4-26-1024x683.jpg',
    alt: 'Storhamar feirer det tiende NM-gullet i 2026',
    caption: 'Champagnejubel etter det tredje strake og tiende NM-gullet i 2026.',
  },
  'honour-2018-league': {
    src: 'https://www.sil.no/wp-content/uploads/2025/02/seriegull-1718-scaled.jpg',
    alt: 'Storhamar feirer seriegullet i 2017/18',
    caption: 'Seriegullet i 2017/18 ble starten på dobbelgullsesongen.',
    sourceUrl: 'https://www.sil.no/historietirsdag-10-seriegull/',
  },
  'honour-2024-league': {
    src: 'https://www.sil.no/wp-content/uploads/2024/02/DSC8473.jpg',
    alt: 'Storhamar i seriegullkampen mot Comet i 2024',
    caption: 'Storhamar sikret klubbens niende seriemesterskap med 10–0 mot Comet 22. februar 2024.',
    sourceUrl: 'https://www.sil.no/stort-a-vinne-med-barndomsklubben/',
  },
  'honour-2025-league': {
    src: 'https://www.sil.no/wp-content/uploads/2025/02/seriegull25.png',
    alt: 'Storhamar seriemester 2024/25',
    caption: 'Storhamar ble seriemester for tiende gang i februar 2025.',
    sourceUrl: 'https://www.sil.no/seriegull/',
  },
  'honour-2026-league': {
    src: 'https://www.sil.no/wp-content/uploads/2026/02/roennild-smil-lorenskog-scaled.jpg',
    alt: 'Martin Rønnild og Storhamar feirer seriegullet i 2025/26',
    caption: 'Storhamar sikret sitt ellevte seriemesterskap med 5–0 borte mot Lørenskog 26. februar 2026.',
    sourceUrl: 'https://www.sil.no/seriegull-2/',
  }
}

export function withHonourMedia(honour: ArchiveHonour): ArchiveHonour {
  const photo = honourPhotos[honour.id]
  if (!photo) return honour
  if (honour.media.some((item) => item.src === photo.src)) return honour

  const media: ArchiveMedia = {
    id: `media-${honour.id}-gold`,
    type: 'photo',
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption,
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
    sourceUrl: photo.sourceUrl ?? defaultNmSourceUrl,
    seasonIds: honour.seasonId ? [honour.seasonId] : undefined,
    rightsNote,
  }

  return {
    ...honour,
    sources: honour.sources.includes('storhamar-official') ? honour.sources : [...honour.sources, 'storhamar-official'],
    media: [...honour.media, media],
  }
}
