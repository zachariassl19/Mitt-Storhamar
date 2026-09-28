import type { ArchiveLegend, ArchiveMedia } from './types'

const silRights = 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.'
const officialRights = 'Offisielt klubbilde brukt som historisk referanse. Rettighetsstatus må følges opp før eventuell lokal kopiering eller videre distribusjon.'

interface LegendPhoto {
  src: string
  sourceUrl: string
  sourceId: 'silarkivet' | 'storhamar-official'
  credit: string
  rightsNote: string
  alt: string
  caption: string
}

const photos: Record<string, LegendPhoto> = {
  'legend-erik-kristiansen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ekristiansen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-k/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Erik Kristiansen i Storhamar', caption: 'Erik «Mester» Kristiansen, nummer 20.',
  },
  'legend-tom-erik-olsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/teolsen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o1/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Tom Erik Olsen i Storhamar', caption: 'Tom Erik Olsen, nummer 9.',
  },
  'legend-jonas-norgren': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jnorgren.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Jonas Norgren i Storhamar', caption: 'Jonas Norgren, keeper og hedret nummer 15.',
  },
  'legend-pal-johnsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/pjohnsen2.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-j/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Pål Johnsen i Storhamar', caption: 'Pål «Magic» Johnsen, nummer 18.',
  },
  'legend-eirik-skadsdammen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/eskadsdammen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/s/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Eirik Skadsdammen i Storhamar', caption: 'Eirik Skadsdammen, nummer 8.',
  },
  'legend-lars-lokken-ostli': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/lloestli.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Lars Løkken Østli i Storhamar', caption: 'Lars Løkken Østli, egenprodusert back og tradisjonsbærer.',
  },
  'legend-joakim-jensen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jjensen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/j/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Joakim Jensen i Storhamar', caption: 'Joakim Jensen, nummer 21 og en av klubbens store målscorere.',
  },
  'legend-lars-erik-hesbraten': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/lehesbraten.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Lars Erik Hesbråten i Storhamar', caption: 'Lars Erik Hesbråten, hedret etter tolv Storhamar-sesonger.',
  },
  'legend-christian-larrivee': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/clarrivee.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-l/', sourceId: 'silarkivet', credit: 'SIL-arkivet / Lars M. Bøe', rightsNote: silRights,
    alt: 'Christian Larrivée i Storhamar', caption: 'Christian «Talismanen» Larrivée, nummer 23.',
  },
  'legend-ole-eskild-dahlstrom': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/dahlstrom_ole_e.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/d/', sourceId: 'silarkivet', credit: 'SIL-arkivet', rightsNote: silRights,
    alt: 'Ole Eskild Dahlstrøm i Storhamar', caption: 'Ole Eskild Dahlstrøm, nummer 10.',
  },
  'legend-patrick-thoresen': {
    src: 'https://www.sil.no/wp-content/uploads/2024/04/patrick-klar-scaled.jpg',
    sourceUrl: 'https://www.sil.no/vi-hedrer-patrick/', sourceId: 'storhamar-official', credit: 'Storhamar Hockey', rightsNote: officialRights,
    alt: 'Patrick Thoresen i Storhamar', caption: 'Patrick Thoresen, nummer 41, fredet for all framtid i 2026.',
  },
  'legend-marthe-osteraas': {
    src: 'https://www.sil.no/wp-content/uploads/2026/02/marthe-taket-scaled.jpg',
    sourceUrl: 'https://www.sil.no/marthe-osteraas-hedret/', sourceId: 'storhamar-official', credit: 'Arve Hovelstuen Blystad / HA via Storhamar Hockey', rightsNote: officialRights,
    alt: 'Marthe Østeraas hedres i Storhamar', caption: 'Marthe Østeraas da nummer 21 ble heist i taket 28. februar 2026.',
  },
}

export function withLegendMedia(legend: ArchiveLegend): ArchiveLegend {
  const photo = photos[legend.id]
  if (!photo) return legend
  if (legend.media.some((item) => item.src === photo.src)) return legend

  const media: ArchiveMedia = {
    id: `media-${legend.id}-portrait`,
    type: 'photo',
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption,
    credit: photo.credit,
    sourceId: photo.sourceId,
    sourceUrl: photo.sourceUrl,
    personIds: [legend.id],
    rightsNote: photo.rightsNote,
  }

  return {
    ...legend,
    sources: legend.sources.includes(photo.sourceId) ? legend.sources : [...legend.sources, photo.sourceId],
    media: [...legend.media, media],
  }
}
