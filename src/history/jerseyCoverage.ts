export type JerseyCoverageCategory = 'main' | 'europe' | 'preseason' | 'playoff' | 'special' | 'curiosity' | 'testimonial'

export interface JerseyCoverageEntry {
  label: string
  category: JerseyCoverageCategory
  sourceUrl: string
}

// Canonical checklist based on SIL-arkivets jersey index.
// This file is intentionally independent from the archive entities so the full-control pass
// can detect variants that are easy to miss (CHL, preseason, playoff, Pride, testimonial etc.).
export const silJerseyCoverage: JerseyCoverageEntry[] = [
  { label: '2024/25 serie', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2024-25-serie/' },
  { label: '2024/25 CHL', category: 'europe', sourceUrl: 'https://silarkivet.no/drakter/2024-25-chl/' },
  { label: '2024 Pride', category: 'special', sourceUrl: 'https://silarkivet.no/drakter/2024-treningskamp/' },
  { label: '2023/24', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2023-24/' },
  { label: '2023 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2023-treningskamp/' },
  { label: '2023 sluttspill', category: 'playoff', sourceUrl: 'https://silarkivet.no/drakter/2023-sluttspill/' },
  { label: '2022/23', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2022-23/' },
  { label: '2022 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2022-treningskamp/' },
  { label: '2022 sluttspill', category: 'playoff', sourceUrl: 'https://silarkivet.no/drakter/2022-sluttspill/' },
  { label: '2021/22', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2021-22/' },
  { label: '2021 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2021-treningskamp/' },
  { label: '2020/21', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2020-21/' },
  { label: '2020 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2020-treningskamp/' },
  { label: '2019/20', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2019-20/' },
  { label: '2019 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2019-treningskamp/' },
  { label: '2019 sluttspill', category: 'playoff', sourceUrl: 'https://silarkivet.no/drakter/2019-sluttspill/' },
  { label: '2018/19 CHL', category: 'europe', sourceUrl: 'https://silarkivet.no/drakter/2018-19-chl/' },
  { label: '2018 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2018-treningskamp/' },
  { label: '2018/19', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2018-19/' },
  { label: '2017/18', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2017-18/' },
  { label: '2017 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2017-treningskamp/' },
  { label: '2016/17', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2016-17/' },
  { label: '2016 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2016-treningskamp/' },
  { label: '2015/16', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2015-16/' },
  { label: '2015/16 CHL', category: 'europe', sourceUrl: 'https://silarkivet.no/drakter/2015-16-chl/' },
  { label: '2015 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2015-treningskamp/' },
  { label: '2015 sluttspill', category: 'playoff', sourceUrl: 'https://silarkivet.no/drakter/2015-sluttspill/' },
  { label: '2014/15', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2014-15/' },
  { label: '2013/14', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2012-14/' },
  { label: '2012/13', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2012-14/' },
  { label: '2012/14 forsesong', category: 'preseason', sourceUrl: 'https://silarkivet.no/drakter/2012-14-forsesong/' },
  { label: '2010–12', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2010-12/' },
  { label: '2007–10', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2007-10/' },
  { label: '2006/07', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2006-07/' },
  { label: '2004–06 bonus', category: 'special', sourceUrl: 'https://silarkivet.no/drakter/2004-06-bonus/' },
  { label: '2003–06', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2002-06/' },
  { label: '2002/03', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/2002-06/' },
  { label: '1998–02', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1998-02/' },
  { label: '1997/98 EHL', category: 'europe', sourceUrl: 'https://silarkivet.no/drakter/1997-98-ehl/' },
  { label: '1989–98', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1989-98/' },
  { label: '1987–89', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1987-89/' },
  { label: '1985–87', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1985-87/' },
  { label: '1984/85', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1984-85/' },
  { label: '1983/84', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1983-84/' },
  { label: '1980–83', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1980-83/' },
  { label: '1977–80', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1977-80/' },
  { label: '1967–77', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1967-77/' },
  { label: '1957–67', category: 'main', sourceUrl: 'https://silarkivet.no/drakter/1957-67/' },
  { label: '2020 sluttspill', category: 'curiosity', sourceUrl: 'https://silarkivet.no/drakter/2020-sluttspill/' },
  { label: '2015/16 hvit', category: 'curiosity', sourceUrl: 'https://silarkivet.no/drakter/2015-16-hvit/' },
  { label: '2015 sluttspill blå', category: 'curiosity', sourceUrl: 'https://silarkivet.no/drakter/2015-sluttspill-bla/' },
  { label: '2000–02 reserve', category: 'curiosity', sourceUrl: 'https://silarkivet.no/drakter/oppvarmings-reservedrakt-2000-02/' },
  { label: 'HamKam-drakta', category: 'curiosity', sourceUrl: 'https://silarkivet.no/drakter/hamkam-drakta-60-70-tall/' },
  { label: '2018 Eirik Skadsdammen testimonial', category: 'testimonial', sourceUrl: 'https://silarkivet.no/drakter/2018-eirik-skadsdammen/' },
  { label: '2015 Pål Johnsen testimonial', category: 'testimonial', sourceUrl: 'https://silarkivet.no/drakter/2015-pal-johnsen/' },
  { label: '2009 Jonas Norgren testimonial', category: 'testimonial', sourceUrl: 'https://silarkivet.no/drakter/2009-jonas-norgren/' },
  { label: '2006 Tom Erik Olsen testimonial', category: 'testimonial', sourceUrl: 'https://silarkivet.no/drakter/2006-tom-erik-olsen/' },
]

export const silJerseyIndexSource = 'https://silarkivet.no/drakter/'
