/** Historic SIL-arkivet all-competition adelskalender, updated through 2025/26.
 * K = appearances, M = goals, A = assists, P = points, U = penalties (minutes).
 * These are overall career totals, not a substitute for per-season statistics.
 */
export const careerTotalsSource = 'https://silarkivet.no/samletabeller/adelskalender-total/'
export interface CareerTotal { name: string; seasons: number; games: number; goals: number; assists: number; points: number; penaltyMinutes: number }
export const careerTotals: CareerTotal[] = [
  {name:'Pål Johnsen',seasons:21,games:963,goals:286,assists:585,points:871,penaltyMinutes:409},
  {name:'Eirik Skadsdammen',seasons:18,games:907,goals:262,assists:291,points:553,penaltyMinutes:687},
  {name:'Tom Erik Olsen',seasons:16,games:680,goals:379,assists:365,points:744,penaltyMinutes:351},
  {name:'Erik Kristiansen',seasons:20,games:649,goals:509,assists:406,points:915,penaltyMinutes:816},
  {name:'Lars Løkken Østli',seasons:15,games:641,goals:110,assists:181,points:291,penaltyMinutes:747},
  {name:'Lars Erik Hesbråten',seasons:12,games:628,goals:110,assists:124,points:234,penaltyMinutes:293},
  {name:'Jonas Norgren',seasons:12,games:627,goals:0,assists:6,points:6,penaltyMinutes:20},
  {name:'Joakim Jensen',seasons:12,games:622,goals:286,assists:277,points:563,penaltyMinutes:275},
  {name:'Martin Rønnild',seasons:11,games:542,goals:133,assists:116,points:249,penaltyMinutes:743},
  {name:'Christian Larrivée',seasons:12,games:530,goals:201,assists:350,points:551,penaltyMinutes:477},
  {name:'Ole Eskild Dahlstrøm',seasons:12,games:527,goals:249,assists:351,points:600,penaltyMinutes:413},
  {name:'Geir Svendsberget',seasons:10,games:513,goals:157,assists:93,points:250,penaltyMinutes:1201},
  {name:'Jon-Hroar Nordstrøm',seasons:14,games:505,goals:73,assists:104,points:177,penaltyMinutes:397},
  {name:'Andreas Øksnes',seasons:11,games:469,goals:21,assists:87,points:108,penaltyMinutes:408},
  {name:'Mattias Livf',seasons:9,games:456,goals:66,assists:163,points:229,penaltyMinutes:298},
  {name:'Cato Ørbæk',seasons:11,games:454,goals:15,assists:63,points:78,penaltyMinutes:569},
  {name:'Magnus Østeraas',seasons:11,games:450,goals:21,assists:50,points:71,penaltyMinutes:370},
  {name:'Børre Østvang',seasons:14,games:448,goals:58,assists:75,points:133,penaltyMinutes:144},
  {name:'Alexander Smirnov',seasons:9,games:439,goals:88,assists:228,points:316,penaltyMinutes:509},
  {name:'Martin B. Huse',seasons:10,games:437,goals:56,assists:85,points:141,penaltyMinutes:244},
  {name:'Tommy Larsen',seasons:11,games:428,goals:20,assists:56,points:76,penaltyMinutes:167},
  {name:'Jimmy Andersson',seasons:11,games:419,goals:38,assists:127,points:165,penaltyMinutes:359},
  {name:'Eirik Salsten',seasons:10,games:407,goals:89,assists:148,points:237,penaltyMinutes:260},
  {name:'Patrick Thoresen',seasons:9,games:401,goals:164,assists:320,points:484,penaltyMinutes:329},
  {name:'Andreas Hjelm',seasons:7,games:396,goals:40,assists:160,points:200,penaltyMinutes:54},
  {name:'Snorre Hallem',seasons:8,games:387,goals:78,assists:70,points:148,penaltyMinutes:401},
  {name:'Svein Harald Arnesen',seasons:10,games:382,goals:0,assists:2,points:2,penaltyMinutes:51},
  {name:'Per Arne Kristiansen',seasons:14,games:371,goals:60,assists:45,points:105,penaltyMinutes:362},
  {name:'Mikael Zettergren',seasons:7,games:365,goals:98,assists:149,points:247,penaltyMinutes:136},
  {name:'Jacob Berglund',seasons:7,games:354,goals:201,assists:224,points:425,penaltyMinutes:227},
]
export function careerTotalForName(name: string): CareerTotal | undefined {
  return careerTotals.find((entry) => entry.name === name)
}
