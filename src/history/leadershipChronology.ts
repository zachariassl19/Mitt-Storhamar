/**
 * Transcribed and season-indexed from SIL-arkivet's historic leadership lists.
 * A season is represented by its start year (2024/25 => 2024).
 * Where SIL lists a midseason coaching change, both names are included and the
 * exact change belongs to the original source rather than an invented date.
 */
export interface LeadershipTerm {
  name: string
  fromSeason: number
  toSeason: number
  note?: string
}

export const coachChronologySource = 'https://silarkivet.no/tidslinje/trenere/'
export const captainChronologySource = 'https://silarkivet.no/tidslinje/kapteiner/'

export const coachTerms: LeadershipTerm[] = [
  { name:'Per Ragnar Pettersen', fromSeason:1976, toSeason:1977, note:'Til desember 1977' },
  { name:'Svenn Rakstad-Larsen', fromSeason:1977, toSeason:1978, note:'Fra desember 1977' },
  { name:'Mats Axelsson', fromSeason:1979, toSeason:1979 },
  { name:'Steinar Johansen / Jan Frode Stenberg / Morten Rakstad-Larsen', fromSeason:1980, toSeason:1980, note:'Delt treneransvar' },
  { name:'Hans Westberg', fromSeason:1981, toSeason:1982 },
  { name:'Kåre Syversen', fromSeason:1983, toSeason:1983, note:'August–oktober 1983' },
  { name:'Morten Lillehagen / Steinar Johansen med flere', fromSeason:1983, toSeason:1983, note:'Fra oktober 1983' },
  { name:'Lasse Beckman', fromSeason:1984, toSeason:1986, note:'Til januar 1987' },
  { name:'Lenny Eriksson', fromSeason:1986, toSeason:1990, note:'Januar 1987–november 1990' },
  { name:'Morten Lillehagen / Ole-Roberth Holmen', fromSeason:1990, toSeason:1990, note:'Fra november 1990' },
  { name:'Lennart Åhlberg', fromSeason:1991, toSeason:1993 },
  { name:'Göran Sjöberg', fromSeason:1994, toSeason:1995, note:'Til oktober 1995' },
  { name:'Petter Thoresen', fromSeason:1995, toSeason:1999, note:'Fra oktober 1995' },
  { name:'Alexander Smirnov / Rune Gulliksen', fromSeason:2000, toSeason:2000, note:'Delt treneransvar' },
  { name:'Rune Gulliksen', fromSeason:2001, toSeason:2001, note:'Til februar 2002' },
  { name:'Petter Salsten', fromSeason:2001, toSeason:2001, note:'Februar–april 2002' },
  { name:'Lars Molin', fromSeason:2002, toSeason:2002 },
  { name:'Petter Salsten', fromSeason:2003, toSeason:2004, note:'Til januar 2005' },
  { name:'Petter Thoresen', fromSeason:2004, toSeason:2006, note:'Fra januar 2005' },
  { name:'Alexander Smirnov / Tommy Orskaug', fromSeason:2007, toSeason:2008 },
  { name:'Rune Gulliksen', fromSeason:2009, toSeason:2009 },
  { name:'Peter Johansson', fromSeason:2010, toSeason:2010 },
  { name:'Michael Smithurst', fromSeason:2011, toSeason:2013, note:'Til januar 2014' },
  { name:'Rune Gulliksen', fromSeason:2013, toSeason:2013, note:'Januar–april 2014' },
  { name:'Alexander Smirnov', fromSeason:2014, toSeason:2015 },
  { name:'Sjur Robert Nilsen', fromSeason:2016, toSeason:2016 },
  { name:'Fredrik Söderström', fromSeason:2017, toSeason:2018 },
  { name:'Miikka Elomo', fromSeason:2019, toSeason:2019 },
  { name:'Anders Gjøse', fromSeason:2020, toSeason:2021 },
  { name:'Petter Thoresen', fromSeason:2022, toSeason:2025, note:'SIL-arkivets åpne periode fra 2022; oppdatert for ferdige sesonger til og med 2025/26' },
]

export const captainTerms: LeadershipTerm[] = [
  { name:'Per Arne Kristiansen', fromSeason:1982, toSeason:1985 },
  { name:'Åge Ellingsen', fromSeason:1986, toSeason:1986 },
  { name:'Harald Bastiansen', fromSeason:1987, toSeason:1987 },
  { name:'Øystein Tronrud', fromSeason:1988, toSeason:1988 },
  { name:'Åge Ellingsen', fromSeason:1989, toSeason:1989 },
  { name:'Peter Madach', fromSeason:1990, toSeason:1990 },
  { name:'Åge Ellingsen', fromSeason:1991, toSeason:1993 },
  { name:'Petter Salsten', fromSeason:1994, toSeason:1997 },
  { name:'Ole Eskild Dahlstrøm', fromSeason:1998, toSeason:1998 },
  { name:'Carl Oscar Bøe Andersen', fromSeason:1999, toSeason:1999 },
  { name:'Michael Smithurst', fromSeason:2000, toSeason:2002 },
  { name:'Mikael Tjälldén', fromSeason:2003, toSeason:2005 },
  { name:'Mattias Livf', fromSeason:2006, toSeason:2009 },
  { name:'Pål Johnsen', fromSeason:2010, toSeason:2012 },
  { name:'Mads Hansen', fromSeason:2013, toSeason:2014 },
  { name:'Christian Larrivée', fromSeason:2015, toSeason:2016 },
  { name:'Patrick Thoresen', fromSeason:2017, toSeason:2017, note:'SIL oppgir 2017 som egen periode' },
  { name:'Kodie Curran', fromSeason:2017, toSeason:2017, note:'2017/18' },
  { name:'Patrick Thoresen', fromSeason:2018, toSeason:2023 },
  { name:'Jacob Berglund', fromSeason:2024, toSeason:2025, note:'SIL: fra 2024, her avgrenset til ferdige sesonger' },
]

export function leadersForSeason(startYear: number): { coaches: LeadershipTerm[]; captains: LeadershipTerm[] } {
  return {
    coaches: coachTerms.filter((term) => term.fromSeason <= startYear && startYear <= term.toSeason),
    captains: captainTerms.filter((term) => term.fromSeason <= startYear && startYear <= term.toSeason),
  }
}
