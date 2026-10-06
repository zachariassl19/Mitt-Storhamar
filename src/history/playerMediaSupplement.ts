import type { ArchivePerson } from './types'

interface PlayerPhotoEvidence {
  src: string
  sourceUrl: string
  alt: string
  credit?: string
  sourceId?: string
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
  'Robin Dahlstrøm': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/rdahlstrom.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-d/',
    alt: 'Robin Dahlstrøm i Storhamar-drakt',
  },
  'Mikael Dokken': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/mdokken.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-d/',
    alt: 'Mikael Dokken i Storhamar-drakt',
  },
  'Simen André Edvardsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/edvardsen-simen-a.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-e/',
    alt: 'Simen André Edvardsen i Storhamar-drakt',
  },
  'Hampus Gustafsson': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/hgustafsson-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-g/',
    alt: 'Hampus Gustafsson i Storhamar-drakt',
  },
  'Josh Nicholls': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jnicholls-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/',
    alt: 'Josh Nicholls i Storhamar-drakt',
  },
  'Mikael Zettergren': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/mzett.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-z/',
    alt: 'Mikael Zettergren i Storhamar-drakt',
  },
  'Robert Hestmann': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/rhestmann-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Robert Hestmann i Storhamar-drakt',
  },
  'Jonathan Hafsmoe': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jhafsmoe.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Jonathan Hafsmoe i Storhamar-drakt',
  },
  'Jørgen Langdalen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jlangdalen-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-l/',
    alt: 'Jørgen Langdalen i Storhamar-drakt',
  },
  'Kenney Morrison': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/kmorrison-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-m/',
    alt: 'Kenney Morrison i Storhamar-drakt',
  },
  'Emil Frøshaug': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/efroshaug-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-f/',
    alt: 'Emil Frøshaug i Storhamar-drakt',
  },
  'Markus Stensrud': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/35-stensrud-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/35-markus-stensrud/',
    alt: 'Markus Stensrud i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Henrik Fayen-Vestavik': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/25-fayen-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/25-henrik-fayen-vestavik/',
    alt: 'Henrik Fayen-Vestavik i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Joe Gatenby': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/5-gatenby-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/5-joe-gatenby/',
    alt: 'Joe Gatenby i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Amil Krupic': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/19-krupic-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/19-amil-krupic/',
    alt: 'Amil Krupic i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Mathias Papuga': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/26-papuga-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/26-mathias-papuga/',
    alt: 'Mathias Papuga i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Christian Bull': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/28-bull-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/28-christian-bull/',
    alt: 'Christian Bull i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Sander Hurrød': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/54-hurrod-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/54-sander-hurrod/',
    alt: 'Sander Hurrød i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Andreas Hjelm': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/88-hjelm-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/88-andreas-hjelm/',
    alt: 'Andreas Hjelm i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Martin Rønnild': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/22-ronnild-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/22-martin-ronnild/',
    alt: 'Martin Rønnild i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Andreas Martinsen': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/27-martinsen-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/27-andreas-martinsen/',
    alt: 'Andreas Martinsen i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Isac Skedung': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/40-skedung-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/40-isac-skedung/',
    alt: 'Isac Skedung i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Axel Sandnes': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/45-sandnes-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/45-axel-sandnes/',
    alt: 'Axel Sandnes i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Kenneth Pappalardo': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/83-pappalardo-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/83-kenneth-pappalardo/',
    alt: 'Kenneth Pappalardo i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Austin Cangelosi': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/86-cangelosi-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/86-austin-cangelosi/',
    alt: 'Austin Cangelosi i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Oliver Nilsgård': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/92-nilsgard-25-26.png',
    sourceUrl: 'https://www.sil.no/laget/92-oliver-nilsgard/',
    alt: 'Oliver Nilsgård i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Mats Bakke Olsen': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/67-olsen-25.26.jpg',
    sourceUrl: 'https://www.sil.no/laget/67-mats-bakke-olsen/',
    alt: 'Mats Bakke Olsen i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Colin Campbell': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/74-campbell-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/74-colin-campbell/',
    alt: 'Colin Campbell i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Marcus Bryhnisveen': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/91-bryhnisveen-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/91-marcus-bryhnisveen/',
    alt: 'Marcus Bryhnisveen i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Stefan Espeland': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/71-espeland-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/71-stefan-espeland/',
    alt: 'Stefan Espeland i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Andreas Dahl': {
    src: 'https://www.sil.no/wp-content/uploads/2025/09/66-dahl-25-26.jpg',
    sourceUrl: 'https://www.sil.no/laget/66-andreas-dahl/',
    alt: 'Andreas Dahl i Storhamar-drakt 2025/26',
    credit: 'Storhamar Hockey',
    sourceId: 'storhamar-official',
  },
  'Morten Fjeld': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/morten_fjeld.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-f/',
    alt: 'Morten Fjeld i Storhamar-drakt',
  },
  'Sven Ole Flensborg': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/soflensborg.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-f/',
    alt: 'Sven Ole Flensborg i Storhamar-drakt',
  },
  'Fredrik Fleischer': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ffleischer.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-f/',
    alt: 'Fredrik Fleischer i Storhamar-drakt',
  },
  'Klas Forfang': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/klas_forfang.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-f/',
    alt: 'Klas Forfang i Storhamar-drakt',
  },
  'Stig Frydenlund': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/frydenlund_stig.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-f/',
    alt: 'Stig Frydenlund i Storhamar-drakt',
  },
  'Kjell Åge Furuholt': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/kaafuruholt.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-f/',
    alt: 'Kjell Åge Furuholt i Storhamar-drakt',
  },
  'Harald Bastiansen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/hbastiansen-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-b/',
    alt: 'Harald Bastiansen i Storhamar-drakt',
  },
  'Thomas Berg': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/tberg.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-b/',
    alt: 'Thomas Berg i Storhamar-drakt',
  },
  'Knut Ivar Berger': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/kiberger-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-b/',
    alt: 'Knut Ivar Berger i Storhamar-drakt',
  },
  'Øystein Bertheussen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/bertheussen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-b/',
    alt: 'Øystein Bertheussen i Storhamar-drakt',
  },
  'Gunnar Bingen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/gbingen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-b/',
    alt: 'Gunnar Bingen i Storhamar-drakt',
  },
  'Petter Birkheim': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/birkheim-petter.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-b/',
    alt: 'Petter Birkheim i Storhamar-drakt',
  },
  'Sondre Bjerke': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/bjerke-sondre.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-b/',
    alt: 'Sondre Bjerke i Storhamar-drakt',
  },
  'David Booth': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/booth-david.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-b/',
    alt: 'David Booth i Storhamar-drakt',
  },
  'Tony Cameranesi': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/cameranesi-tony.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-c/',
    alt: 'Tony Cameranesi i Storhamar-drakt',
  },
  'Chris Clark': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/cclark.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-c/',
    alt: 'Chris Clark i Storhamar-drakt',
  },
  'Blake Cosgrove': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/bcosgrove.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-c/',
    alt: 'Blake Cosgrove i Storhamar-drakt',
  },
  'Eirik Dagfinrud': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/edagfinrud.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-d/',
    alt: 'Eirik Dagfinrud i Storhamar-drakt',
  },
  'Anders Hage': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ahage-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Anders Hage i Storhamar-drakt',
  },
  'Stein André Hagen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/sahagen-1.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Stein André Hagen i Storhamar-drakt',
  },
  'Robin Haglund': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/haglund-robin.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Robin Haglund i Storhamar-drakt',
  },
  'Fredrik Lystad Jacobsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/fljacobsen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-j/',
    alt: 'Fredrik Lystad Jacobsen i Storhamar-drakt',
  },
  'Jens Jakobs': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jensjakobs2.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-j/',
    alt: 'Jens Jakobs i Storhamar-drakt',
  },
  'Anton Karlsson': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/karlsson-anton.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-k/',
    alt: 'Anton Karlsson i Storhamar-drakt',
  },
  'Jan Karlsson': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jannekarlsson.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-k/',
    alt: 'Jan Karlsson i Storhamar-drakt',
  },
  'Ole Arne Langdalen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ole_a_langdalen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-l/',
    alt: 'Ole Arne Langdalen i Storhamar-drakt',
  },
  'Peter Madach': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/pmadach.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-m/',
    alt: 'Peter Madach i Storhamar-drakt',
  },
  'Vidar Nerem': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/nerem_vidar.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/',
    alt: 'Vidar Nerem i Storhamar-drakt',
  },
  'Jake Newton': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/newton-jake.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/',
    alt: 'Jake Newton i Storhamar-drakt',
  },
  'André Paulsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/abpaulsen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-p/',
    alt: 'André Paulsen i Storhamar-drakt',
  },
  'Finn Paulsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/fpaulsen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-p/',
    alt: 'Finn Paulsen i Storhamar-drakt',
  },
  'Ronny Tajet': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ronny_tajet.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-t/',
    alt: 'Ronny Tajet i Storhamar-drakt',
  },
  'Tore Elman Tangen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/tangen_tore.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-t/',
    alt: 'Tore Elman Tangen i Storhamar-drakt',
  },
  'Joey Tenute': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jtenute.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-t/',
    alt: 'Joey Tenute i Storhamar-drakt',
  },
  'Jørgen Salsten': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/salsten_jorgen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Jørgen Salsten i Storhamar-drakt',
  },
  'Petter Salsten': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/petter_salsten.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Petter Salsten i Storhamar-drakt',
  },
  'Christian Saxrud': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/csaxrud.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Christian Saxrud i Storhamar-drakt',
  },
  'Simen Saxrud': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ssaxrud.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Simen Saxrud i Storhamar-drakt',
  },
  'Roar Skaug': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/roar_skaug.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Roar Skaug i Storhamar-drakt',
  },
  'Olav Slåtlandet': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/olav_slatlandet.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Olav Slåtlandet i Storhamar-drakt',
  },
  'Bjørn Morten Stenberg': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/stenberg_bjorn1.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Bjørn Morten Stenberg i Storhamar-drakt',
  },
  'Mikkel Stensrud': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/mstensrud.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Mikkel Stensrud i Storhamar-drakt',
  },
  'Linus Stensson': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/lstensson.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-s/',
    alt: 'Linus Stensson i Storhamar-drakt',
  },
  'Sindre Hallem': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/sindre_hallem.jpg?resize=160%2C229',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Sindre Hallem i Storhamar-drakt',
  },
  'André Manskov Hansen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/andre_m_hansen.jpg?resize=200%2C254',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'André Manskov Hansen i Storhamar-drakt',
  },
  'Isak Hansen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/isakh.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Isak Hansen i Storhamar-drakt',
  },
  'Jaakko Harikkala': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jharikkala.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Jaakko Harikkala i Storhamar-drakt',
  },
  'Magnus Eikrem Haugen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/mehaugen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Magnus Eikrem Haugen i Storhamar-drakt',
  },
  'Anders Haugum': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/haugum-anders.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Anders Haugum i Storhamar-drakt',
  },
  'Alexander Hellnemo': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/ahellnemo.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Alexander Hellnemo i Storhamar-drakt',
  },
  'Daniel Hermansson': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/dhermannson.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-h/',
    alt: 'Daniel Hermansson i Storhamar-drakt',
  },
  'Christian Remo Nicolaisen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/crnicolaisen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/',
    alt: 'Christian Remo Nicolaisen i Storhamar-drakt',
  },
  'Daniel Nielsen': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/dnielsen.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/',
    alt: 'Daniel Nielsen i Storhamar-drakt',
  },
  'Jakob Lundell Noer': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jlnoer.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/',
    alt: 'Jakob Lundell Noer i Storhamar-drakt',
  },
  'Terje Nordlien': {
    src: 'https://i0.wp.com/silarkivet.no/wp-content/uploads/tnordlien.jpg?resize=600%2C408',
    sourceUrl: 'https://silarkivet.no/alumni/alumni-n/',
    alt: 'Terje Nordlien i Storhamar-drakt',
  },
  "Zach O'Brien": {
    src: 'https://www.sil.no/wp-content/uploads/elementor/thumbs/34-obrien-mini-25-26-rbz9smfdpbxy7cv9tfn0jkxcn60z4nd0jxftxas12s.png',
    sourceUrl: 'https://www.sil.no/statpack-semifinale-3/',
    alt: "Zach O'Brien i Storhamar-drakt 2025/26",
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
        credit: photo.credit ?? 'SIL-arkivet',
        sourceId: photo.sourceId ?? 'silarkivet',
        sourceUrl: photo.sourceUrl,
        personIds: [player.id],
        rightsNote: photo.sourceId === 'storhamar-official'
          ? 'Offisielt spillerbilde fra Storhamar Hockey brukt som kildebasert arkivmedia.'
          : 'Historisk spillerbilde fra SIL-arkivet brukt i Mitt Storhamar som kildebasert arkivmedia.',
      }],
    }
  })
}
