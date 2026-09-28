import type { ArchiveJersey, ArchiveMedia, JerseyUsage } from './types'

const verifiedAt = '2026-09-28'
const rightsNote = 'Historisk materiale fra SIL-arkivet. Prosjekteier har opplyst at materialet kan brukes i Mitt Storhamar.'

function media(id: string, src: string, alt: string, sourceUrl: string, seasonIds: string[], caption?: string): ArchiveMedia {
  return {
    id,
    type: 'jersey',
    src,
    alt,
    caption,
    credit: 'SIL-arkivet',
    sourceId: 'silarkivet',
    sourceUrl,
    seasonIds,
    rightsNote,
  }
}

function item(args: {
  id: string
  title: string
  slug: string
  summary: string
  seasonIds: string[]
  usage: JerseyUsage[]
  sourceUrl: string
  manufacturer?: string
  colours?: string[]
  body?: string[]
  media?: ArchiveMedia[]
  completeness?: 'partial' | 'verified'
  tags?: string[]
}): ArchiveJersey {
  return {
    id: args.id,
    title: args.title,
    slug: args.slug,
    summary: args.summary,
    body: args.body ?? [],
    completeness: args.completeness ?? (args.media?.length ? 'verified' : 'partial'),
    sources: ['silarkivet'],
    media: args.media ?? [],
    related: args.seasonIds.map((id) => ({ kind: 'season' as const, id })),
    fromSeasonId: args.seasonIds[0],
    toSeasonId: args.seasonIds.at(-1),
    seasonIds: args.seasonIds,
    usage: args.usage,
    manufacturer: args.manufacturer,
    colours: args.colours,
    playerIds: [],
    notableMomentIds: [],
    tags: ['draktarkiv', ...(args.tags ?? [])],
    lastVerifiedAt: verifiedAt,
  }
}

const gullalderUrl = 'https://silarkivet.no/drakter/1989-98/'
const missionUrl = 'https://silarkivet.no/drakter/2002-06/'

export const detailedJerseys: ArchiveJersey[] = [
  item({
    id: 'jersey-season-1987-88', title: '1987/88 · Seriedrakt', slug: '1987-88-seriedrakt',
    summary: 'Seriedrakten fra den sterke 1987/88-sesongen, del av Tibås-perioden før gullalderdesignet.',
    seasonIds: ['season-1987-88'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/1987-89/', manufacturer: 'Tibås', colours: ['gul', 'blå'],
  }),
  item({
    id: 'jersey-season-1988-89', title: '1988/89 · Seriedrakt', slug: '1988-89-seriedrakt',
    summary: 'Seriedrakten fra 1988/89, den siste fasen før det ikoniske 1989–98-designet.',
    seasonIds: ['season-1988-89'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/1987-89/', manufacturer: 'Tibås', colours: ['gul', 'blå'],
  }),

  item({ id: 'jersey-season-1989-90', title: '1989/90 · Gullalderdrakten', slug: '1989-90-gullalderdrakt', summary: 'Første sesong av det ikoniske gullalderdesignet, levert av Tackla.', seasonIds: ['season-1989-90'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tackla', colours: ['gul', 'blå'], media: [media('media-detail-89-90', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/89-90.png?resize=750%2C473', 'Storhamars drakt 1989/90', gullalderUrl, ['season-1989-90'], '1989/90-varianten av gullalderdesignet.')] }),
  item({ id: 'jersey-season-1990-91', title: '1990/91 · Gullalderdrakten', slug: '1990-91-gullalderdrakt', summary: 'Tackla-varianten der blå og røde nummer erstattet svarte nummer.', seasonIds: ['season-1990-91'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tackla', colours: ['gul', 'blå', 'rød'], media: [media('media-detail-90-91', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/90-91.png?resize=750%2C473', 'Storhamars drakt 1990/91', gullalderUrl, ['season-1990-91'])] }),
  item({ id: 'jersey-season-1991-92', title: '1991/92 · Gullalderdrakten', slug: '1991-92-gullalderdrakt', summary: 'Første Tibås-variant i gullalderperioden, med mer reklame og mindre klubbmerke.', seasonIds: ['season-1991-92'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tibås', colours: ['gul', 'blå'], media: [media('media-detail-91-92', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/91-92-1.png?resize=750%2C473', 'Storhamars drakt 1991/92', gullalderUrl, ['season-1991-92'])] }),
  item({ id: 'jersey-season-1992-93', title: '1992/93 · Første seriegull', slug: '1992-93-forste-seriegull', summary: 'Drakten fra åpningen av Hamar OL-Amfi og Storhamars første seriemesterskap.', seasonIds: ['season-1992-93'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tibås', colours: ['gul', 'blå'], media: [media('media-detail-92-93', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/92-93.png?resize=750%2C473', 'Storhamars drakt 1992/93', gullalderUrl, ['season-1992-93'])] }),
  item({ id: 'jersey-season-1993-94', title: '1993/94 · Seriegull og første NM-finale', slug: '1993-94-seriegull-nm-finale', summary: 'Tibås-drakten fra seriegullet og klubbens første NM-finale.', seasonIds: ['season-1993-94'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tibås', colours: ['gul', 'blå'], media: [media('media-detail-93-94', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/93-94.png?resize=750%2C473', 'Storhamars drakt 1993/94', gullalderUrl, ['season-1993-94'])] }),
  item({ id: 'jersey-season-1994-95', title: '1994/95 · Første NM-gull', slug: '1994-95-forste-nm-gull', summary: 'Drakten fra det første NM-gullet og seriegullet i 1995.', seasonIds: ['season-1994-95'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tibås', colours: ['gul', 'blå'], media: [media('media-detail-94-95', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/94-95.png?resize=750%2C473', 'Storhamars drakt 1994/95', gullalderUrl, ['season-1994-95'])] }),
  item({ id: 'jersey-season-1995-96', title: '1995/96 · NM-gull nummer to', slug: '1995-96-nm-gull-to', summary: 'Tibås-drakten fra klubbens andre strake NM-gull og Europacupdebut.', seasonIds: ['season-1995-96'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tibås', colours: ['gul', 'blå'], media: [media('media-detail-95-96', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/95-96.png?resize=750%2C473', 'Storhamars drakt 1995/96', gullalderUrl, ['season-1995-96'])] }),
  item({ id: 'jersey-season-1996-97', title: '1996/97 · Dobbelgull', slug: '1996-97-dobbelgull', summary: 'Mørkere Tibås-variant med oppdatert klubbmerke fra den suverene dobbelgullsesongen.', seasonIds: ['season-1996-97'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tibås', colours: ['gul', 'blå'], media: [media('media-detail-96-97', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/96-97.png?resize=750%2C473', 'Storhamars drakt 1996/97', gullalderUrl, ['season-1996-97'])] }),
  item({ id: 'jersey-season-1997-98', title: '1997/98 · Siste klassiske gullalderdrakt', slug: '1997-98-siste-gullalderdrakt', summary: 'Siste sesong med det klassiske designet, nå med hvit krage.', seasonIds: ['season-1997-98'], usage: ['home'], sourceUrl: gullalderUrl, manufacturer: 'Tibås', colours: ['gul', 'blå', 'hvit'], media: [media('media-detail-97-98', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/97-98.png?resize=750%2C473', 'Storhamars drakt 1997/98', gullalderUrl, ['season-1997-98'])] }),
  item({ id: 'jersey-1997-98-ehl', title: '1997/98 · European Hockey League', slug: '1997-98-ehl-drakt', summary: 'Egen drakt brukt i Storhamars første sesong i European Hockey League.', seasonIds: ['season-1997-98'], usage: ['europe'], sourceUrl: 'https://silarkivet.no/drakter/1997-98-ehl/', tags: ['Europa', 'EHL'] }),

  item({ id: 'jersey-season-1998-99-dragons', title: '1998/99 · Første Dragons-drakt', slug: '1998-99-dragons', summary: 'Første sesong med Dragons-navnet, flammer og den nye drageprofilen.', seasonIds: ['season-1998-99'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/1998-02/', manufacturer: 'Jofa', colours: ['gul', 'blå'], media: [media('media-detail-98-99', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/98-99.png?resize=750%2C473', 'Storhamar Dragons-drakt 1998/99', 'https://silarkivet.no/drakter/1998-02/', ['season-1998-99'])] }),
  item({ id: 'jersey-season-1999-00-dragons', title: '1999/00 · NM-gulldrakt', slug: '1999-00-dragons-nm-gull', summary: 'Dragons-drakten fra NM-gullet i 2000, med mindre logo enn debutsesongen.', seasonIds: ['season-1999-00'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/1998-02/', manufacturer: 'Jofa', colours: ['gul', 'blå'], media: [media('media-detail-99-00', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/99-00.png?resize=750%2C473', 'Storhamar Dragons-drakt 1999/00', 'https://silarkivet.no/drakter/1998-02/', ['season-1999-00'])] }),
  item({ id: 'jersey-season-2000-01-dragons', title: '2000/01 · Seriegulldrakt', slug: '2000-01-dragons-seriegull', summary: 'Jofa Dragons-drakten brukt da Storhamar vant serien i 2000/01.', seasonIds: ['season-2000-01'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/1998-02/', manufacturer: 'Jofa', colours: ['gul', 'blå'] }),
  item({ id: 'jersey-season-2001-02-dragons', title: '2001/02 · Jofa Dragons', slug: '2001-02-jofa-dragons', summary: 'Siste sesong av den første Dragons-flammedrakten.', seasonIds: ['season-2001-02'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/1998-02/', manufacturer: 'Jofa', colours: ['gul', 'blå'] }),
  item({ id: 'jersey-2000-02-reserve', title: '2000–02 · Reserve-/oppvarmingsdrakt', slug: '2000-02-reservedrakt', summary: 'En egen reserve- og oppvarmingsdrakt fra Dragons-perioden.', seasonIds: ['season-2000-01', 'season-2001-02'], usage: ['third', 'other'], sourceUrl: 'https://silarkivet.no/drakter/oppvarmings-reservedrakt-2000-02/', tags: ['kuriositet', 'reserve'] }),

  item({ id: 'jersey-season-2002-03-mission', title: '2002/03 · Mission flammedrakt', slug: '2002-03-mission', summary: 'Første sesong med Mission og andre generasjon Dragons-flammedrakt.', seasonIds: ['season-2002-03'], usage: ['home', 'away'], sourceUrl: missionUrl, manufacturer: 'Mission', colours: ['gul', 'blå'], media: [media('media-detail-02-03-home', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/02-03-h.png?resize=750%2C473', 'Storhamars hjemmedrakt 2002/03', missionUrl, ['season-2002-03']), media('media-detail-02-03-away', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2002-03_b.png?resize=750%2C473', 'Storhamars bortedrakt 2002/03', missionUrl, ['season-2002-03'])] }),
  item({ id: 'jersey-season-2003-04-mission', title: '2003/04 · Dobbelgull', slug: '2003-04-mission-dobbelgull', summary: 'Mission-draktene fra seriegullet og det legendariske NM-gullet i kamp sju.', seasonIds: ['season-2003-04'], usage: ['home', 'away'], sourceUrl: missionUrl, manufacturer: 'Mission', colours: ['gul', 'blå'], media: [media('media-detail-03-04-home', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2003-04-h.png?resize=750%2C473', 'Storhamars hjemmedrakt 2003/04', missionUrl, ['season-2003-04']), media('media-detail-03-04-away', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2003-04_b.png?resize=750%2C473', 'Storhamars bortedrakt 2003/04', missionUrl, ['season-2003-04'])] }),
  item({ id: 'jersey-season-2004-05-mission', title: '2004/05 · Mission', slug: '2004-05-mission', summary: 'Mission-drakten fra lockoutsesongen med NHL-profiler i Hamar.', seasonIds: ['season-2004-05'], usage: ['home', 'away'], sourceUrl: missionUrl, manufacturer: 'Mission', colours: ['gul', 'blå'], media: [media('media-detail-04-05-home', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2004-05-h.png?resize=750%2C473', 'Storhamars hjemmedrakt 2004/05', missionUrl, ['season-2004-05']), media('media-detail-04-05-away', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2004-05_b.png?resize=750%2C473', 'Storhamars bortedrakt 2004/05', missionUrl, ['season-2004-05'])] }),
  item({ id: 'jersey-season-2005-06-mission', title: '2005/06 · Seriegulldrakt', slug: '2005-06-mission-seriegull', summary: 'Siste Mission-flammedrakt, brukt under det suverene seriegullet.', seasonIds: ['season-2005-06'], usage: ['home', 'away'], sourceUrl: missionUrl, manufacturer: 'Mission', colours: ['gul', 'blå'], media: [media('media-detail-05-06-home', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2005-06-h.png?resize=750%2C473', 'Storhamars hjemmedrakt 2005/06', missionUrl, ['season-2005-06']), media('media-detail-05-06-away', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2005-06_b.png?resize=750%2C473', 'Storhamars bortedrakt 2005/06', missionUrl, ['season-2005-06'])] }),
  item({ id: 'jersey-2004-06-bonus', title: '2004–06 · Bonusdrakt', slug: '2004-06-bonusdrakt', summary: 'Ekstra draktvariant fra sluttfasen av Mission-perioden.', seasonIds: ['season-2004-05', 'season-2005-06'], usage: ['special', 'other'], sourceUrl: 'https://silarkivet.no/drakter/2004-06-bonus/', tags: ['bonusdrakt'] }),

  item({ id: 'jersey-season-2006-07', title: '2006/07 · Seriedrakter', slug: '2006-07-seriedrakter', summary: 'Hjemme- og bortedraktene fra NM-finalesesongen 2006/07.', seasonIds: ['season-2006-07'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2006-07/' }),
  item({ id: 'jersey-era-2007-10', title: '2007–10 · Seriedrakter', slug: '2007-10-seriedrakter', summary: 'Draktperioden som omfatter NM-gullet i 2008 og sesongene fram til 2009/10.', seasonIds: ['season-2007-08', 'season-2008-09', 'season-2009-10'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2007-10/' }),
  item({ id: 'jersey-era-2010-12', title: '2010–12 · Seriedrakter', slug: '2010-12-seriedrakter', summary: 'Seriedraktene brukt i 2010/11 og 2011/12.', seasonIds: ['season-2010-11', 'season-2011-12'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2010-12/', manufacturer: 'Bauer' }),
  item({ id: 'jersey-2012-14-preseason', title: '2012–14 · Forsesong', slug: '2012-14-forsesong', summary: 'Egen treningskamp-/forsesongdrakt fra Bauer-perioden.', seasonIds: ['season-2012-13', 'season-2013-14'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/2012-14-treningskampdrakt/' }),
  item({ id: 'jersey-season-2014-15', title: '2014/15 · Seriedrakter', slug: '2014-15-seriedrakter', summary: 'Draktene fra den utrolige redningssesongen som endte i kamp sju i NM-finalen.', seasonIds: ['season-2014-15'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2014-15/' }),

  item({ id: 'jersey-season-2015-16', title: '2015/16 · Seriedrakter', slug: '2015-16-seriedrakter', summary: 'Seriedraktene i den første hele sesongen etter at Dragons-navnet var lagt bort.', seasonIds: ['season-2015-16'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2015-16/' }),
  item({ id: 'jersey-2015-16-chl', title: '2015/16 · CHL', slug: '2015-16-chl-drakter', summary: 'Egne Champions Hockey League-drakter fra Storhamars første CHL-eventyr.', seasonIds: ['season-2015-16'], usage: ['europe'], sourceUrl: 'https://silarkivet.no/drakter/2015-16-chl/', tags: ['CHL', 'Europa'] }),
  item({ id: 'jersey-2015-preseason', title: '2015 · Forsesong', slug: '2015-forsesongdrakt', summary: 'Egen treningskampdrakt brukt foran 2015/16-sesongen.', seasonIds: ['season-2015-16'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/2015-treningskampdrakt/' }),
  item({ id: 'jersey-2015-playoff', title: '2015 · Sluttspill', slug: '2015-sluttspilldrakt', summary: 'Egen sluttspilldrakt fra våren 2015, da Storhamar nådde NM-finalen.', seasonIds: ['season-2014-15'], usage: ['playoff'], sourceUrl: 'https://silarkivet.no/drakter/2015-sluttspill/' }),
  item({ id: 'jersey-2015-playoff-blue-away', title: '2015 · Blå sluttspill-bortedrakt', slug: '2015-bla-sluttspill-borte', summary: 'Blå bortedrakt fra sluttspillet 2015, bevart som egen kuriositet i SIL-arkivet.', seasonIds: ['season-2014-15'], usage: ['away', 'playoff'], sourceUrl: 'https://silarkivet.no/drakter/2015-sluttspill-bortedrakt/', tags: ['kuriositet'] }),
  item({ id: 'jersey-2015-16-white-third', title: '2015/16 · Hvit tredjedrakt', slug: '2015-16-hvit-tredjedrakt', summary: 'Hvit alternativ drakt fra 2015/16, bevart som egen kuriositet.', seasonIds: ['season-2015-16'], usage: ['third'], sourceUrl: 'https://silarkivet.no/drakter/2015-16-tredjedrakt/', colours: ['hvit'], tags: ['kuriositet'] }),

  item({ id: 'jersey-season-2016-17', title: '2016/17 · Seriedrakter', slug: '2016-17-seriedrakter', summary: 'Hjemme- og bortedraktene fra 2016/17.', seasonIds: ['season-2016-17'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2016-17/' }),
  item({ id: 'jersey-2016-preseason', title: '2016 · Forsesong', slug: '2016-forsesongdrakt', summary: 'Egen treningskampdrakt brukt foran 2016/17.', seasonIds: ['season-2016-17'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/treningskampdrakt-2016/' }),
  item({ id: 'jersey-season-2017-18', title: '2017/18 · Dobbelgulldrakter', slug: '2017-18-dobbelgulldrakter', summary: 'Seriedraktene fra sesongen Storhamar vant både liga og NM.', seasonIds: ['season-2017-18'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2017-18/' }),
  item({ id: 'jersey-2017-preseason', title: '2017 · Forsesong', slug: '2017-forsesongdrakt', summary: 'Egen treningskampdrakt foran dobbelgullsesongen.', seasonIds: ['season-2017-18'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/treningskampdrakt-2017/' }),

  item({ id: 'jersey-2018-preseason', title: '2018 · Forsesong', slug: '2018-forsesongdrakt', summary: 'Treningskampdrakt brukt sommeren/høsten 2018.', seasonIds: ['season-2018-19'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/treningskampdrakt-2018/' }),
  item({ id: 'jersey-2018-19-chl', title: '2018/19 · CHL', slug: '2018-19-chl-drakter', summary: 'Warrior-draktene fra CHL-eventyret med avansement fra gruppespillet og åttedelsfinale mot Skellefteå.', body: ['CHL leverte egne drakter. Storhamar valgte et design som minnet om uttrykket fra NM-gullet i 2018. Mørkt var hjemmefarge, mens gult ble brukt på bortebane.'], seasonIds: ['season-2018-19'], usage: ['europe'], sourceUrl: 'https://silarkivet.no/drakter/2018-19-chl/', manufacturer: 'Warrior', colours: ['blå', 'gul'], media: [media('media-detail-2018-19-chl-home', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2018-19-CHL-h.png?resize=750%2C473', 'Storhamars CHL-hjemmedrakt 2018/19', 'https://silarkivet.no/drakter/2018-19-chl/', ['season-2018-19']), media('media-detail-2018-19-chl-away', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/2018-19-CHL-b.png?resize=750%2C473', 'Storhamars CHL-bortedrakt 2018/19', 'https://silarkivet.no/drakter/2018-19-chl/', ['season-2018-19'])], tags: ['CHL', 'Europa'] }),
  item({ id: 'jersey-2019-playoff', title: '2019 · Sluttspill', slug: '2019-sluttspilldrakt', summary: 'Egen sluttspilldrakt brukt i NM-sluttspillet 2019.', seasonIds: ['season-2018-19'], usage: ['playoff'], sourceUrl: 'https://silarkivet.no/drakter/2019-sluttspill/' }),
  item({ id: 'jersey-2019-preseason', title: '2019 · Forsesong', slug: '2019-forsesongdrakt', summary: 'Egen treningskampdrakt foran 2019/20.', seasonIds: ['season-2019-20'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/treningskampdrakt-2019/' }),
  item({ id: 'jersey-season-2019-20', title: '2019/20 · Seriedrakter', slug: '2019-20-seriedrakter', summary: 'Seriedraktene fra sesongen som ble avsluttet uten NM-sluttspill på grunn av pandemien.', seasonIds: ['season-2019-20'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2019-20/' }),
  item({ id: 'jersey-2020-playoff', title: '2020 · Sluttspilldrakt som aldri fikk sluttspill', slug: '2020-sluttspilldrakt', summary: 'Sluttspilldrakten som var laget for våren 2020, men der selve sluttspillet ble avlyst.', seasonIds: ['season-2019-20'], usage: ['playoff', 'special'], sourceUrl: 'https://silarkivet.no/2020-sluttspill/', tags: ['kuriositet', 'pandemi'] }),
  item({ id: 'jersey-2020-preseason', title: '2020 · Forsesong', slug: '2020-forsesongdrakt', summary: 'Treningskampdrakt brukt foran den pandemipregede 2020/21-sesongen.', seasonIds: ['season-2020-21'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/2020-treningskamp/' }),
  item({ id: 'jersey-season-2020-21', title: '2020/21 · Seriedrakter', slug: '2020-21-seriedrakter', summary: 'Seriedraktene fra den avkortede 2020/21-sesongen.', seasonIds: ['season-2020-21'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2020-21/' }),

  item({ id: 'jersey-2021-preseason', title: '2021 · Forsesong', slug: '2021-forsesongdrakt', summary: 'Treningskampdrakt foran 2021/22.', seasonIds: ['season-2021-22'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/treningskampdrakter-2021/' }),
  item({ id: 'jersey-season-2021-22', title: '2021/22 · Moderne klassiker', slug: '2021-22-seriedrakter', summary: 'Modernisert utgave av de klassiske 90-tallsdraktene, med både gul og ny blå variant.', body: ['SIL-arkivet beskriver designet som en modernisering av de tradisjonelle Storhamar-draktene fra 90-tallet. Den nye blå utgaven ble utviklet som del av samme sett.'], seasonIds: ['season-2021-22'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2021-22-seriedrakter/', manufacturer: 'CCM', colours: ['gul', 'blå'], media: [media('media-detail-2021-22-home', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/serie2122gul.jpg?resize=750%2C473', 'Storhamars gule seriedrakt 2021/22', 'https://silarkivet.no/drakter/2021-22-seriedrakter/', ['season-2021-22']), media('media-detail-2021-22-away', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/21-22-borte.jpg?resize=750%2C473', 'Storhamars blå seriedrakt 2021/22', 'https://silarkivet.no/drakter/2021-22-seriedrakter/', ['season-2021-22'])] }),
  item({ id: 'jersey-2022-playoff', title: '2022 · Sluttspill', slug: '2022-sluttspilldrakt', summary: 'Egen sluttspilldrakt brukt på veien til NM-finalen i 2022.', seasonIds: ['season-2021-22'], usage: ['playoff'], sourceUrl: 'https://silarkivet.no/drakter/2022-sluttspill/' }),
  item({ id: 'jersey-2022-preseason', title: '2022 · Forsesong', slug: '2022-forsesongdrakt', summary: 'Treningskampdrakt foran 2022/23.', seasonIds: ['season-2022-23'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/treningskampdrakter-2022/' }),
  item({ id: 'jersey-season-2022-23', title: '2022/23 · Seriedrakter', slug: '2022-23-seriedrakter', summary: 'Seriedraktene fra 2022/23-sesongen som endte med NM-finale.', seasonIds: ['season-2022-23'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2022-23/' }),
  item({ id: 'jersey-2023-playoff', title: '2023 · Sluttspill', slug: '2023-sluttspilldrakt', summary: 'Egen sluttspilldrakt fra NM-sluttspillet 2023.', seasonIds: ['season-2022-23'], usage: ['playoff'], sourceUrl: 'https://silarkivet.no/drakter/2023-sluttspill/' }),
  item({ id: 'jersey-2023-preseason', title: '2023 · Forsesong', slug: '2023-forsesongdrakt', summary: 'Treningskampdrakt foran dobbelgullsesongen 2023/24.', seasonIds: ['season-2023-24'], usage: ['preseason'], sourceUrl: 'https://silarkivet.no/drakter/2023-treningskamp/' }),
  item({ id: 'jersey-season-2023-24', title: '2023/24 · Dobbelgulldrakter', slug: '2023-24-dobbelgulldrakter', summary: 'Seriedraktene fra starten på den nye gullrekka: seriegull og NM-gull i 2024.', seasonIds: ['season-2023-24'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2023-24/' }),
  item({ id: 'jersey-2024-pride', title: '2024 · Pride-drakt', slug: '2024-pride-drakt', summary: 'Spesialdrakt knyttet til Storhamars Pride-kamp og markering.', seasonIds: ['season-2023-24'], usage: ['special'], sourceUrl: 'https://silarkivet.no/drakter/2024-treningskamp/', tags: ['Pride', 'spesialdrakt'] }),
  item({ id: 'jersey-season-2024-25', title: '2024/25 · Seriedrakter', slug: '2024-25-seriedrakter', summary: 'Seriedraktene fra det andre strake dobbelgullet.', seasonIds: ['season-2024-25'], usage: ['home', 'away'], sourceUrl: 'https://silarkivet.no/drakter/2024-25-serie/' }),
  item({ id: 'jersey-2024-25-chl', title: '2024/25 · CHL', slug: '2024-25-chl-drakter', summary: 'Egne CHL-drakter fra Storhamars retur til Champions Hockey League i 2024/25.', seasonIds: ['season-2024-25'], usage: ['europe'], sourceUrl: 'https://silarkivet.no/drakter/2024-25-chl/', tags: ['CHL', 'Europa'] }),

  item({ id: 'jersey-testimonial-tom-erik-olsen-2006', title: '2006 · Tom Erik Olsen testimonial', slug: 'tom-erik-olsen-testimonial-2006', summary: 'Storhamars første egne testimonialdrakt, designet til Tom Erik Olsens hyllestkamp.', body: ['Drakten tok utgangspunkt i datidens NHL All-Star-drakter. Fargene kom feil fra leverandøren, med mørkere blått og lysere gult enn planlagt.'], seasonIds: ['season-2006-07'], usage: ['testimonial'], sourceUrl: 'https://silarkivet.no/drakter/tom-erik-olsen-testimonial/', manufacturer: 'Easton', colours: ['blå', 'gul'], media: [media('media-testimonial-teo-2006', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/teo-testimonial.png?resize=750%2C473', 'Tom Erik Olsens testimonialdrakt', 'https://silarkivet.no/drakter/tom-erik-olsen-testimonial/', ['season-2006-07'])], tags: ['testimonial'] }),
  item({ id: 'jersey-testimonial-jonas-norgren-2010', title: '2010 · Jonas Norgren testimonial', slug: 'jonas-norgren-testimonial-2010', summary: '«Team Bertil»-drakten som kombinerte keeper-/murveggmotiv med Storhamar- og Östervåla-farger.', seasonIds: ['season-2009-10'], usage: ['testimonial'], sourceUrl: 'https://silarkivet.no/drakter/jonas-norgren-testimonial-2010/', manufacturer: 'Easton', colours: ['gul', 'blå', 'hvit'], media: [media('media-testimonial-jonas-2010', 'https://i0.wp.com/silarkivet.no/wp-content/uploads/jonas-testimonial.png?resize=750%2C473', 'Jonas Norgrens testimonialdrakt', 'https://silarkivet.no/drakter/jonas-norgren-testimonial-2010/', ['season-2009-10'])], tags: ['testimonial'] }),
  item({ id: 'jersey-testimonial-pal-johnsen-2015', title: '2015 · Pål Johnsen testimonial', slug: 'pal-johnsen-testimonial-2015', summary: 'Spesialdrakt produsert til Pål Johnsens testimonial og hedring.', seasonIds: ['season-2015-16'], usage: ['testimonial'], sourceUrl: 'https://silarkivet.no/drakter/pal-johnsen-testimonial-2015/', tags: ['testimonial'] }),
  item({ id: 'jersey-testimonial-eirik-skadsdammen-2018', title: '2018 · Eirik Skadsdammen testimonial', slug: 'eirik-skadsdammen-testimonial-2018', summary: 'Spesialdrakt produsert til Eirik Skadsdammens testimonial.', seasonIds: ['season-2018-19'], usage: ['testimonial'], sourceUrl: 'https://silarkivet.no/drakter/eirik-skadsdammen-testimonial-2018/', tags: ['testimonial'] }),
]
