import type { ArchivePerson } from './types'

interface PlayerPhotoEvidence {
  src: string
  sourceUrl: string
  alt: string
}

const photos: Record<string, PlayerPhotoEvidence> = {
  'Jacob Berglund': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jberglund.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/b/',
    alt: 'Jacob Berglund i Storhamar-drakt',
  },
  'Arne Bergseng': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/arne_bergseng.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/b/',
    alt: 'Arne Bergseng i Storhamar-drakt',
  },
  'Lars Bergseng': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/lars_bergseng.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/b/',
    alt: 'Lars Bergseng i Storhamar-drakt',
  },
  'Ole Eskild Dahlstrøm': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/oedahlstrom.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-d/',
    alt: 'Ole Eskild Dahlstrøm i Storhamar-drakt',
  },
  'Lars Erik Hesbråten': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/lehesbraten.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Lars Erik Hesbråten i Storhamar-drakt',
  },
  'Pål Johnsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/pjohnsen2.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-j/',
    alt: 'Pål Johnsen i Storhamar-drakt',
  },
  'Joakim Jensen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jjensen-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-j/',
    alt: 'Joakim Jensen i Storhamar-drakt',
  },
  'Erik Kristiansen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ekristiansen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-k/',
    alt: 'Erik Kristiansen i Storhamar-drakt',
  },
  'Christian Larrivée': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/clarrivee.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-l/',
    alt: 'Christian Larrivée i Storhamar-drakt',
  },
  'Jonas Norgren': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jnorgren.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/',
    alt: 'Jonas Norgren i Storhamar-drakt',
  },
  'Eirik Skadsdammen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/eskadsdammen-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Eirik Skadsdammen i Storhamar-drakt',
  },
  'Cole Schneider': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/cschneider.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Cole Schneider i Storhamar-drakt',
  },
  'Eirik Salsten': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/esalsten.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Eirik Salsten i Storhamar-drakt',
  },
  'Håvard Salsten': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/hsalsten.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Håvard Salsten i Storhamar-drakt',
  },
  'Steffen Thoresen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/thoresen_steffen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-t/',
    alt: 'Steffen Thoresen i Storhamar-drakt',
  },
  'Lars Løkken Østli': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/lloestli.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o/',
    alt: 'Lars Løkken Østli i Storhamar-drakt',
  },
  'Mads Hansen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/mhansen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Mads Hansen i Storhamar-drakt',
  },
  'Mattias Livf': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/mlivf.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-l/',
    alt: 'Mattias Livf i Storhamar-drakt',
  },
  'Alexander Smirnov': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/asmirnov.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Alexander Smirnov i Storhamar-drakt',
  },
  'Knut Henrik Spets': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/khspets.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Knut Henrik Spets i Storhamar-drakt',
  },
  'Geir Svendsberget': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/gsvendsberget.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Geir Svendsberget i Storhamar-drakt',
  },
  'Oskar Östlund': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ooestlund.png?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o/',
    alt: 'Oskar Östlund i Storhamar-drakt',
  },
  'Kodie Curran': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/kcurran-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-c/',
    alt: 'Kodie Curran i Storhamar-drakt',
  },
  'Antti Rahkonen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/arahkonen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-r/',
    alt: 'Antti Rahkonen i Storhamar-drakt',
  },
  'Samuel Solem': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ssolem.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Samuel Solem i Storhamar-drakt',
  },
  'Victor Svensson': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/vsvensson2.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Victor Svensson i Storhamar-drakt',
  },
  'Remo Martinsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/remo_martinsen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-m/',
    alt: 'Remo Martinsen i Storhamar-drakt',
  },
  'Remo André Martinsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/remo_martinsen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-m/',
    alt: 'Remo André Martinsen i Storhamar-drakt',
  },
  'Jim Marthinsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jmarthninsen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-m/',
    alt: 'Jim Marthinsen i Storhamar-drakt',
  },
  'Tom Erik Olsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/teolsen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o1/',
    alt: 'Tom Erik Olsen i Storhamar-drakt',
  },
  'Christian Olasveengen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/colasveengen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o1/',
    alt: 'Christian Olasveengen i Storhamar-drakt',
  },
  'Christian A. Olasveengen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/colasveengen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o1/',
    alt: 'Christian Olasveengen i Storhamar-drakt',
  },
  'Eskild Bakke Olsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/olsen-eskild.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o1/',
    alt: 'Eskild Bakke Olsen i Storhamar-drakt',
  },
  'Urban Omark': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/uomark.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-o1/',
    alt: 'Urban Omark i Storhamar-drakt',
  },
  'Snorre Hallem': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/snhallem.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Snorre Hallem i Storhamar-drakt',
  },
  'Ola Johannessen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ojohannessen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-j/',
    alt: 'Ola Johannessen i Storhamar-drakt',
  },
  'Ola Hoel Johannessen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ojohannessen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-j/',
    alt: 'Ola Hoel Johannessen i Storhamar-drakt',
  },
  'Chris Marinucci': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/cmarinuccu.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-m/',
    alt: 'Chris Marinucci i Storhamar-drakt',
  },
  'Jim Marthinsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jmarthninsen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-m/',
    alt: 'Jim Marthinsen i Storhamar-drakt',
  },
  'Joakim Persson': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jpersson.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-p/',
    alt: 'Joakim Persson i Storhamar-drakt',
  },
  'Mikael Tjälldén': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/mtjaellden.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-t/',
    alt: 'Mikael Tjälldén i Storhamar-drakt',
  },
  'Kristian Forsberg': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/kforsberg.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-f/',
    alt: 'Kristian Forsberg i Storhamar-drakt',
  },
}

export function withPlayerMediaSupplement(players: ArchivePerson[]): ArchivePerson[] {
  return players.map((player) => {
    if (player.media.length > 0) return player
    const photo = photos[player.fullName]
    if (!photo) return player

    return {
      ...player,
      media: [{
        id: `media-${player.id}-sil-alumni`,
        type: 'photo',
        src: photo.src,
        alt: photo.alt,
        caption: photo.alt,
        credit: 'SIL-arkivet',
        sourceId: 'silarkivet',
        sourceUrl: photo.sourceUrl,
        personIds: [player.id],
        rightsNote: 'Historisk spillerbilde fra SIL-arkivet brukt i Mitt Storhamar som kildebasert arkivmedia.',
      }],
    }
  })
}
