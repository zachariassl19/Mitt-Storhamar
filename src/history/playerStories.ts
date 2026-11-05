/**
 * Redaksjonelle spillerhistorier basert på SIL-arkivets spillerprofiler,
 * kamp-/sesonghistorie og testimonialoversikter.
 * Historien leses som fortelling. Kildeføring er separat fra brødteksten.
 */
export interface PlayerStoryChapter { heading: string; text: string }
export interface PlayerStory { name: string; lead: string; chapters: PlayerStoryChapter[]; sources: { label: string; url: string }[] }

export const playerStories: PlayerStory[] = [
  {
    "name": "Eirik Skadsdammen",
    "lead": "Fra Finnskogen til 18 sesonger i gult og blått. «Maskina» ble selve bildet på lojalitet, arbeidsvilje og en klubb som aldri ga seg.",
    "chapters": [
      {
        "heading": "Fra skogen til Storhamar",
        "text": "Skadsdammen vokste opp på Finnskogen og kom til Hamar fra Kongsvinger-miljøet. Han var så knyttet til skogslivet at han hadde fri til elgjakta som en del av avtalen sin. På isen lærte han av Ole Eskild Dahlstrøm og Tom Erik Olsen og fant snart sin egen plass i Storhamar."
      },
      {
        "heading": "Mannen som kunne spille overalt",
        "text": "Han ble brukt både som defensiv forward og som målscorer i førsterekka. Sterk fysikk og uvanlig utholdenhet ga ham kallenavnet «Maskina». Flere skadeavbrekk stanset ham aldri lenge. I 2014/15 fikk han en ny toppsesong med 68 poeng i serie og sluttspill."
      },
      {
        "heading": "Målet som avgjorde alt",
        "text": "I 2008 satte Skadsdammen inn vinnermålet i sudden death i den sjette NM-finalen mot Frisk Asker. Det sikret Storhamars sjette kongepokal. Da han avsluttet A-lagskarrieren i 2018, hadde han vært med på tre NM-gull."
      },
      {
        "heading": "Team Skogen og nummer åtte",
        "text": "24. august 2018 samlet testimonialen «Team Skogen» gamle lagkamerater i Hamar OL-Amfi. De grønne og brune draktene med elg på brystet fortalte mye om mannen som ble hedret. Nummer 8 kom opp i taket og ble et synlig minne om 18 sesonger med innsats for laget."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-s/"
      },
      {
        "label": "Testimonialen",
        "url": "https://silarkivet.no/tidslinje/testimonialkamper/"
      }
    ]
  },
  {
    "name": "Pål Johnsen",
    "lead": "«Magic» fikk navnet sitt allerede i debuten. Derfra vokste den tekniske Hamar-gutten til å bli en av Storhamars største klubbspillere.",
    "chapters": [
      {
        "heading": "Drømmedebuten",
        "text": "Johnsen ble lagt merke til fra første øyeblikk. Etter bare 15 sekunder mot Hasle/Løren scoret han sitt første mål for A-laget. Publikum fant raskt på tilnavnet «Magic» og det skulle følge ham gjennom karrieren."
      },
      {
        "heading": "En egen måte å spille hockey på",
        "text": "Han hadde røtter i Storhamar og spilte med et teknisk register preget av den russiske hockeyskolen. Han kunne løse opp en kamp med en uventet pasning, samtidig som han var en lagspiller som bar stort ansvar. Etter et utenlandsopphold vendte han tilbake til Storhamar og fortsatte å være en nøkkelfigur."
      },
      {
        "heading": "Klubbens kamperkonge",
        "text": "Johnsen spilte 21 sesonger og står med 963 offisielle kamper i klubbens adelskalender. Han var med på fem NM-gull og fikk Gullpucken etter 1999/2000-sesongen. Under testimonialen 5. september 2015 ble drakt nummer 18 pensjonert."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-j/"
      },
      {
        "label": "Testimonialer",
        "url": "https://silarkivet.no/tidslinje/testimonialkamper/"
      }
    ]
  },
  {
    "name": "Erik Kristiansen",
    "lead": "«Mester Erik» var den store stjernen da Storhamar tok steget inn i norsk topphockey. Han fikk være med helt fram til klubbens første NM-gull.",
    "chapters": [
      {
        "heading": "Fra talent til publikumshelt",
        "text": "Erik Kristiansen debuterte i topphockeyen som tenåring og ble raskt publikums store favoritt. Gjennom 1980-tallet var han en av Norges mest markante offensive spillere, både for Storhamar og landslaget."
      },
      {
        "heading": "Han bar Storhamar gjennom epokene",
        "text": "Kristiansen var med mens klubben gikk fra naturis og små rammer til ishall, OL-Amfi og profesjonelle ambisjoner. Han ble en bro mellom pionertiden og gullalderen og holdt nivået oppe gjennom hele den lange karrieren."
      },
      {
        "heading": "Endelig NM-gull",
        "text": "Etter mange år med nesten-triumfer kunne Kristiansen løfte kongepokalen for første gang i 1995. Han fikk to NM-gull til før han la opp i 1998. Med 509 mål og 915 poeng er han en av klubbens fremste målprodusenter. Nummer 20 ble pensjonert i 1999."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-k/"
      },
      {
        "label": "Klubbens epoker",
        "url": "https://silarkivet.no/tidslinje/historien/"
      }
    ]
  },
  {
    "name": "Steinar Johansen",
    "lead": "Før OL-Amfi og gullalderen var det Steinar Johansen. Han spilte fra ungdomsårene til 1983 og var Storhamars første store hockeyprofil.",
    "chapters": [
      {
        "heading": "Fra tenåring til førstestjerne",
        "text": "Johansen spilte treningskamper for A-laget allerede som 14-åring. Han var med før Storhamar fikk plass i det offisielle seriesystemet og utviklet seg til lagets store profil gjennom både opp- og nedrykk."
      },
      {
        "heading": "26 sesonger med Storhamar",
        "text": "Gjennom 26 sesonger opplevde han både den første naturisperioden og overgangen til ishall. Johansen var ikke bare en god spiller, men også en del av familiene og ildsjelene som bygde hockeymiljøet på Hamar."
      },
      {
        "heading": "Navnet som ble stående",
        "text": "Steinar Johansen avsluttet karrieren som 40-åring med Storhamar etablert på øverste nivå. Draktnummer 11 er pensjonert. Sammen med broren Per Arne og faren Arvid satte han varige spor i klubben."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-j/"
      },
      {
        "label": "Storhamars første år",
        "url": "https://silarkivet.no/tidslinje/historien/"
      }
    ]
  },
  {
    "name": "Tom Erik Olsen",
    "lead": "Oslogutten kom til Hamar med få eiendeler i 1990 og ble værende i 16 sesonger. Nummer 9 ble et symbol på mål, humor og en hel gullalder.",
    "chapters": [
      {
        "heading": "En overraskende overgang",
        "text": "Tom Erik Olsen kom fra Frisk til Storhamar i 1990. Få ante hvor sterkt han skulle prege klubben. Med godt humør, egen spillestil og en evne til å finne nettmaskene ble han snart en av de viktigste spillerne på laget."
      },
      {
        "heading": "Gullårenes målscorer",
        "text": "Han spilte sentralt i laget som fikk se OL-Amfi reise seg og tok de første NM-gullene. Samarbeidet med Ole Eskild Dahlstrøm ble en viktig del av Storhamars offensive styrke. Olsen scoret 379 mål på 680 kamper for klubben."
      },
      {
        "heading": "En av gutta – for alltid",
        "text": "Olsen beholdt det litt gammeldagse utstyret sitt, selv da hockeyen forandret seg rundt ham. Han fikk testimonialkamp i 2006, og 4. september 2009 ble nummer 9 hedret med banner i Hamar OL-Amfi."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-o/"
      },
      {
        "label": "Testimonialer",
        "url": "https://silarkivet.no/tidslinje/testimonialkamper/"
      }
    ]
  },
  {
    "name": "Ole Eskild Dahlstrøm",
    "lead": "Den tekniske senteren kom til Hamar som en stjerne og var med på å gjøre Storhamar til Norges mest fryktede angrepslag på 1990-tallet.",
    "chapters": [
      {
        "heading": "Stortalentet fra Furuset",
        "text": "Dahlstrøm hadde allerede gjort seg bemerket i norsk hockey da han kom til Storhamar i 1992. På Hamar ble han en offensiv motor med både blikket og ferdighetene til å gjøre medspillerne bedre."
      },
      {
        "heading": "Gull og store kamper",
        "text": "Han og Tom Erik Olsen skapte et angrepssamarbeid det var vanskelig å stanse. Dahlstrøm fikk Gullpucken etter 1995/96 og leverte 92 poeng i 1996/97-sesongen. I semifinalen mot Vålerenga i 2002 viste han igjen hva han kunne med to avgjørende soloprestasjoner."
      },
      {
        "heading": "Nummer ti i taket",
        "text": "Gjennom 12 sesonger vant han fem NM-gull og satte varige spor i klubbens offensive historie. Nummer 10 ble heist i taket 10. desember 2022."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-d/"
      },
      {
        "label": "Historiske milepæler",
        "url": "https://silarkivet.no/tidslinje/milepaeler/"
      }
    ]
  },
  {
    "name": "Jonas Norgren",
    "lead": "Den svenske keeperen kom etter tre strake NM-gull og tok over en av de vanskeligste jobbene i Storhamar: å erstatte et vinnerlag bakerst på banen.",
    "chapters": [
      {
        "heading": "Den nye sisteskansen",
        "text": "Jonas Norgren kom til Hamar i 1997. Etter hvert tok han hovedansvaret i mål og utviklet seg til en av klubbens største keepere. Publikum adopterte sangen «Du kan lita på mej» som en hyllest til mannen mellom stengene."
      },
      {
        "heading": "Han reddet viktige mesterskap",
        "text": "Norgren var en bærebjelke i gullaget i 2000 og igjen i 2004. Sesongen 2004/05 hadde han en redningsprosent på rundt 94 i grunnserien og leverte en av sine sterkeste sesonger, selv i konkurranse med NHL-keeperen Chris Mason i ligaen."
      },
      {
        "heading": "En klubbmann også etter karrieren",
        "text": "Mot slutten hjalp han yngre keepere, blant dem Ruben Smith. I 2009 fikk Norgren testimonial og nummer 15 i taket. Senere kom han tilbake til klubben i trenerapparatet."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-n/"
      },
      {
        "label": "Testimonialer",
        "url": "https://silarkivet.no/tidslinje/testimonialkamper/"
      }
    ]
  },
  {
    "name": "Joakim Jensen",
    "lead": "Joakim Jensen gjorde det vanskeligste i ishockey til en vane: å stå på riktig sted når pucken kom. Og i 2017 scoret han et mål som aldri blir glemt.",
    "chapters": [
      {
        "heading": "Fra ukjent til målmaskin",
        "text": "Jensen kom til Storhamar etter juniorhockey i Canada. Han var verken den største eller raskeste forwarden, men hadde en sjelden evne til å lese spillet og avslutte fra de rette posisjonene."
      },
      {
        "heading": "Mål, mål og enda flere mål",
        "text": "Jensen var i tolv sesonger en av de viktigste offensive spillerne. Han hadde lange perioder med over 20 mål i sesongen og ble spesielt farlig i overtall. Han spilte i forskjellige rekker med blant andre Nathan Martz, Pål Johnsen og Christian Larrivée."
      },
      {
        "heading": "Målet etter 217 minutter",
        "text": "I mars 2017 avgjorde Jensen sluttspillkampen mot Sparta etter 217 minutter og 14 sekunder. Den historiske maratonkampen ble et bilde på Storhamars utholdenhet. I 2019 ble nummer 21 hedret med blått banner i testimonialen «Three Stars»."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-j/"
      },
      {
        "label": "Testimonialer",
        "url": "https://silarkivet.no/tidslinje/testimonialkamper/"
      }
    ]
  },
  {
    "name": "Lars Løkken Østli",
    "lead": "En egenutviklet back som gikk fra Storhamars ungdomsavdeling til 15 sesonger på A-laget og ble en av klubbens mest pålitelige forsvarsspillere.",
    "chapters": [
      {
        "heading": "En back fra egen klubb",
        "text": "Østli vokste fram i Storhamars eget system. Som ung back kombinerte han god spilleforståelse med offensive egenskaper og fikk også prøve seg på et høyere nivå i Luleå."
      },
      {
        "heading": "Tradisjonsbæreren",
        "text": "Skader satte ham tidvis tilbake, men han fortsatte å være sentral for laget gjennom hele sin lange karriere. På sitt beste var han landslagsaktuell og en av klubbens fremste egenproduserte backer."
      },
      {
        "heading": "Three Stars",
        "text": "7. september 2019 ble han hedret sammen med Joakim Jensen og Lars Erik Hesbråten. Østli fikk gult banner i taket som markerte et fredet nummer."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-o/"
      },
      {
        "label": "Testimonialen",
        "url": "https://silarkivet.no/tidslinje/testimonialkamper/"
      }
    ]
  },
  {
    "name": "Lars Erik Hesbråten",
    "lead": "En spiller som satte laget først. Fra første forsøk på Hamar til en lang karriere som både forward og back ble Lars Erik Hesbråten en av klubbens viktigste arbeidsjern.",
    "chapters": [
      {
        "heading": "Veien fra Kongsvinger",
        "text": "Hesbråten kom til Storhamar i Eirik Skadsdammens fotspor. Den første perioden ble kort, men etter en modningsperiode i Kongsvinger vendte han tilbake og tok en fast plass i laget."
      },
      {
        "heading": "Alltid der laget trengte ham",
        "text": "Han kjempet for hver puck og var villig til å blokkere skudd. Under tøffere tider ble han flyttet fra angrepet ned på backplass og løste også den rollen. Samtidig var han en viktig del av garderobemiljøet."
      },
      {
        "heading": "Hedret sammen med lagkameratene",
        "text": "Etter totalt tolv sesonger ble han i 2019 hedret i «Three Stars»-kampen sammen med Joakim Jensen og Lars Løkken Østli. Det blå banneret markerte en heder for en spiller som ofte gjorde den usynlige jobben."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-h/"
      },
      {
        "label": "Testimonialer",
        "url": "https://silarkivet.no/tidslinje/testimonialkamper/"
      }
    ]
  },
  {
    "name": "Christian Larrivée",
    "lead": "«Talismanen» kom fra Canada og ble publikumsfavoritt, playmaker og en av de store drivkreftene i Storhamars nyere historie.",
    "chapters": [
      {
        "heading": "Første møte med Hamar",
        "text": "Larrivée kom til Storhamar foran 2006/07 og gjorde umiddelbart inntrykk. I sitt første sluttspill leverte han 13 mål og 19 assist på 17 kamper – 32 poeng – selv om laget tapte finalen."
      },
      {
        "heading": "Han fant veien tilbake",
        "text": "Etter et opphold utenfor klubben kom han tilbake og ble værende i mange år. Gjennom sterke og svake sesonger gjorde han medspillere bedre og ble en spiller publikum knyttet seg sterkt til."
      },
      {
        "heading": "Avskjeden som måtte utsettes",
        "text": "Pandemien forsinket testimonialen, men 27. august 2022 kom den endelig. Familien kom fra Canada og 3019 tilskuere så ham score fire ganger i en oppvisningskamp. Til slutt ble det blå banneret med nummer 23 heist i taket."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-l/"
      },
      {
        "label": "Testimonialkampen",
        "url": "https://silarkivet.no/tidslinje/testimonialkamper/"
      }
    ]
  },
  {
    "name": "Patrick Thoresen",
    "lead": "Fra Storhamar til internasjonal topphockey og tilbake til Hamar. Patrick Thoresens hjemkomst betydde mer enn poeng og mål.",
    "chapters": [
      {
        "heading": "Ute i hockeyverdenen",
        "text": "Thoresen spilte store deler av sin karriere i sterke utenlandske ligaer og på Norges landslag. Da han kom tilbake til Storhamar i 2017, fikk klubben en spiller med stor internasjonal erfaring."
      },
      {
        "heading": "Hjemkomsten og gullet",
        "text": "Han kom inn i et lag som jaget en ny storhetstid. I 2017/18 ble Storhamar seriemester og norgesmester, og Thoresen var en viktig del av laget som endelig brøt en lang NM-tørke."
      },
      {
        "heading": "En historie som fortsetter",
        "text": "Etter flere sesonger med Storhamar ble nummer 41 en tydelig del av klubbens moderne identitet. Klubben har besluttet at nummeret skal fredes for framtiden."
      }
    ],
    "sources": [
      {
        "label": "Storhamars historie",
        "url": "https://silarkivet.no/tidslinje/historien/"
      },
      {
        "label": "Karrieretall",
        "url": "https://silarkivet.no/samletabeller/adelskalender-total/"
      }
    ]
  },
  {
    "name": "Marthe Østeraas",
    "lead": "Historien om Marthe Østeraas handler om mer enn et draktnummer. Hun var med på å bygge mulighetene for jenter og kvinner som ville spille hockey i Storhamar.",
    "chapters": [
      {
        "heading": "Hun spilte med gutta",
        "text": "Da Marthe Østeraas var ung, fantes det ikke et eget jentetilbud. Hun måtte spille sammen med guttene for å kunne drive med sporten sin."
      },
      {
        "heading": "Hun åpnet dører",
        "text": "Som spiller og ildsjel var hun med på å utvikle både damelag og tilbud for jenter i flere aldersgrupper. Hun fortsatte senere å bidra som dommer. Arbeidet gjorde det lettere for nye generasjoner å ta plass på isen."
      },
      {
        "heading": "Et historisk nummer 21",
        "text": "28. februar 2026 ble draktnummer 21 heist i taket i Hamar. Hedringen gjorde henne til den første kvinnelige utøveren i norsk hockey med denne æren."
      }
    ],
    "sources": [
      {
        "label": "Storhamar Hockey",
        "url": "https://www.sil.no/"
      }
    ]
  },
  {
    "name": "Michael Smithurst",
    "lead": "Alle som opplevde NM-finalen i 2004 husker skuddet fra blålinja. Michael Smithurst ble gullhelten da det gjaldt som mest.",
    "chapters": [
      {
        "heading": "En kaptein på Hamar",
        "text": "Smithurst kom til Storhamar fra Frisk i 1999 og ble kjent som en seriøs og samlende back. Han var lagkaptein i tre sesonger fra 2000/01 til 2002/03."
      },
      {
        "heading": "Skuddet klokken 81.54",
        "text": "Den sjuende og avgjørende NM-finalen mot Vålerenga i 2004 gikk til den andre overtidsperioden. Foran 7405 tilskuere i OL-Amfi fikk Smithurst pucken ved blålinja og scoret etter 81 minutter og 54 sekunder. Storhamar var norgesmester."
      },
      {
        "heading": "Målet som står igjen",
        "text": "Det øyeblikket ble et av de mest berømte i klubbhistorien. Smithurst avsluttet i praksis sin Storhamar-karriere med å avgjøre en av de mest dramatiske finalene klubben har spilt."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-s/"
      },
      {
        "label": "Klubbhistorien",
        "url": "https://silarkivet.no/tidslinje/historien/"
      }
    ]
  },
  {
    "name": "Eirik Salsten",
    "lead": "Hamar-gutten tok en omvei før han ble en av Storhamars viktigste spillere og en avgjørende mann i gullåret 2024.",
    "chapters": [
      {
        "heading": "Veien tilbake til Hamar",
        "text": "Salsten kom gjennom Storhamars yngre rekker, men fikk ikke hele veien gjennombruddet med én gang. Han spilte andre steder før han vendte hjem fra Stavanger Oilers i 2018 som en mer erfaren og etablert spiller."
      },
      {
        "heading": "Fra defensiv til avgjørende",
        "text": "Han ble lenge brukt i defensive roller, men tok etter hvert større ansvar i angrepsspillet. En stygg ansiktsskade vinteren 2023 stanset ham ikke fra å komme tilbake."
      },
      {
        "heading": "Sluttspillhelten i 2024",
        "text": "Han var sentral i Storhamars gulljakt og scoret det avgjørende målet i sudden death i den siste NM-finalen mot Vålerenga. Etter sluttspillet ble han kåret til sluttspillets beste spiller."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-s/"
      },
      {
        "label": "Sesongen 2023/24",
        "url": "https://silarkivet.no/sesonger/"
      }
    ]
  },
  {
    "name": "Nathan Martz",
    "lead": "Playmakeren med blikk for den ekstra pasningen. I 2008 var Nathan Martz en av nøklene til Storhamars NM-gull.",
    "chapters": [
      {
        "heading": "En annerledes erstatter",
        "text": "Martz kom til klubben før 2007/08 som erstatter for Christian Larrivée. Han var en annen type forward, men hadde overblikk og evne til å styre spillet fra plassene andre spillere ikke så."
      },
      {
        "heading": "Bak mål i den avgjørende finalen",
        "text": "I den sjette finalekampen mot Frisk Asker var det Martz som spilte fram Eirik Skadsdammen til den avgjørende scoringen i sudden death. Martz hadde store smerter i hånda under sluttspillet, men leverte likevel på høyt nivå."
      },
      {
        "heading": "En populær retur",
        "text": "Etter et opphold i ungarsk hockey kom han tilbake til Hamar i 2011. Han spilte tre nye sesonger og ble husket som en playmaker som også elsket duellene og det psykiske spillet i kampene."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-m/"
      }
    ]
  },
  {
    "name": "Mads Hansen",
    "lead": "Mads Hansen kom tidlig til Storhamar, vant NM og vendte tilbake som en av ligaens største profiler i 2005/06.",
    "chapters": [
      {
        "heading": "Gull som ung spiller",
        "text": "Hansen kom til Storhamar rundt årtusenskiftet og fikk være med på NM-gullet i 2000. Han utviklet seg videre gjennom opphold i norsk og svensk ishockey."
      },
      {
        "heading": "Den store returen",
        "text": "I 2005/06 kom han tilbake til Hamar og leverte på et nivå som gjorde ham til en av de fremste offensive spillerne i ligaen. Han var viktig da Storhamar tok seriemesterskapet."
      },
      {
        "heading": "En større norsk hockeykarriere",
        "text": "Hansen hadde også en omfattende karriere på landslaget og i svenske klubber. Selv om årene på Hamar kom i flere perioder, ble han en tydelig del av klubbens 2000-tallshistorie."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-h/"
      },
      {
        "label": "Sesongen 2005/06",
        "url": "https://silarkivet.no/sesonger/"
      }
    ]
  },
  {
    "name": "Rune Gulliksen",
    "lead": "«Hurtigtoget fra Fredrikstad» ga Storhamar fart og kreativitet i de avgjørende årene før klubbens første gullperiode.",
    "chapters": [
      {
        "heading": "Satsingen i 1991",
        "text": "Gulliksen kom til Storhamar sommeren 1991 etter sterke sesonger i Trondheim. Sammen med nye spillere som Petter Thoresen bidro han til at Storhamar igjen kunne utfordre de beste."
      },
      {
        "heading": "Farten som forandret laget",
        "text": "Med hurtighet og teknikk ble han raskt en viktig offensiv brikke. Storhamar nådde semifinalen i 1992, mens det nye OL-Amfi og en stadig sterkere spillerstall gjorde at klubben tok nye steg de neste årene."
      },
      {
        "heading": "En sentral overgangsfigur",
        "text": "Gulliksen var med på overgangen fra den gamle ishallen til den moderne gullperioden. Han kom inn i klubbens historie som en av spillerne som gjorde gjennombruddet mulig."
      }
    ],
    "sources": [
      {
        "label": "Storhamars 1990-tall",
        "url": "https://silarkivet.no/tidslinje/historien/"
      },
      {
        "label": "Sesongarkiv",
        "url": "https://silarkivet.no/sesonger/"
      }
    ]
  },
  {
    "name": "Petter Thoresen",
    "lead": "Petter Thoresen kom til Storhamar som spiller og vinner, og vendte senere tilbake som trener for flere av klubbens store epoker.",
    "chapters": [
      {
        "heading": "Overgangen i 1991",
        "text": "Da Thoresen forlot Vålerenga og kom til Hamar i 1991 var det et signal om at Storhamar mente alvor. Han hadde vinnerviljen og rutinen klubben trengte for å ta de neste stegene."
      },
      {
        "heading": "Fra spiller til trener",
        "text": "Etter spillerkarrieren fortsatte han å prege klubben som trener. Han var blant annet trener gjennom deler av gullperioden på 1990-tallet og kom tilbake til benken i senere sesonger."
      },
      {
        "heading": "Gull på tvers av generasjoner",
        "text": "Få har vært knyttet til så ulike deler av Storhamars utvikling: kampen for å bli en mesterklubb, gullperiodene og det moderne laget som igjen kjempet om titlene."
      }
    ],
    "sources": [
      {
        "label": "Klubbhistorien",
        "url": "https://silarkivet.no/tidslinje/historien/"
      },
      {
        "label": "Trenerhistorikken",
        "url": "https://silarkivet.no/tidslinje/trenere/"
      }
    ]
  },
  {
    "name": "Peter Quenneville",
    "lead": "Peter Quenneville ble en av profilene i den nye gullperioden og var poengkonge da Storhamar tok dobbeltgull i 2023/24.",
    "chapters": [
      {
        "heading": "En viktig del av angrepet",
        "text": "Quenneville var allerede en sentral del av Storhamars angrepsspill i 2022/23. Han tok enda et steg i den påfølgende sesongen og leverte mange av poengene klubben trengte."
      },
      {
        "heading": "Gullsesongen",
        "text": "I 2023/24 ble Quenneville lagets poengkonge med 88 poeng i sesongoversikten. Storhamar vant både serien og NM, og forwarden ble et av ansiktene på klubbens nye storhetstid."
      }
    ],
    "sources": [
      {
        "label": "Sesongarkivet 2023/24",
        "url": "https://silarkivet.no/sesonger/"
      }
    ]
  },
  {
    "name": "Cole Schneider",
    "lead": "Etter en lang nordamerikansk karriere kom Cole Schneider til Storhamar og ble en av de store profilene i dobbeltgullsesongen 2024/25.",
    "chapters": [
      {
        "heading": "Erfaring fra Nord-Amerika",
        "text": "Schneider hadde erfaring fra AHL og NHL før han signerte for Storhamar. Allerede fra starten viste han at han kunne prege kamper med målfarlighet og spilleforståelse."
      },
      {
        "heading": "Gullåret 2024/25",
        "text": "I sin Storhamar-sesong ble han en dominerende offensiv spiller. Han toppet sesongoversikten med 74 poeng, mens Storhamar forsvarte både seriemesterskapet og NM-tittelen."
      }
    ],
    "sources": [
      {
        "label": "Sesongarkivet 2024/25",
        "url": "https://silarkivet.no/sesonger/"
      }
    ]
  },
  {
    "name": "Jacob Berglund",
    "lead": "Jacob Berglund ble en nøkkelspiller og kaptein i Storhamars nyere gullrekke.",
    "chapters": [
      {
        "heading": "Fra spillerprofil til leder",
        "text": "Berglund hadde allerede gjort seg bemerket som en poengsterk forward da han tok over kapteinsansvaret i 2024."
      },
      {
        "heading": "Tre strake dobler",
        "text": "Som en sentral spiller i de nyere gullsesongene var han med på å bygge videre på Storhamars posisjon i norsk topphockey. I 2025/26 ble han lagets poengkonge med 70 poeng og Storhamar sikret et nytt serie- og NM-gull."
      }
    ],
    "sources": [
      {
        "label": "Sesongarkivet 2025/26",
        "url": "https://silarkivet.no/sesonger/"
      },
      {
        "label": "Kapteiner",
        "url": "https://silarkivet.no/tidslinje/kapteiner/"
      }
    ]
  },
  {
    "name": "Martin Åhlberg",
    "lead": "Svensken Martin Åhlberg kom til Storhamar med målteft og ble en del av angrepsmaskinen ved starten av gullalderen.",
    "chapters": [
      {
        "heading": "En ny offensiv kraft",
        "text": "Åhlberg sluttet seg til Storhamar tidlig på 1990-tallet og fant et godt samspill med Erik Kristiansen. Han var en teknisk og målfarlig spiller i en periode da klubben tok steget opp blant Norges beste."
      },
      {
        "heading": "Sterke tall fra gamle OL-Amfi",
        "text": "På 147 seriekamper noterte han seg for 137 mål og 210 poeng. Den voldsomme produksjonen bidro til at Storhamars første år i OL-Amfi ble preget av offensiv og underholdende hockey."
      }
    ],
    "sources": [
      {
        "label": "Storhamars gullalder",
        "url": "https://silarkivet.no/tidslinje/historien/"
      },
      {
        "label": "Historiske sesonger",
        "url": "https://silarkivet.no/sesonger/"
      }
    ]
  },
  {
    "name": "Tomas Berg",
    "lead": "En publikumsvennlig svenske med teknikk, fantasi og viktig rolle i Storhamars Europacup-eventyr på slutten av 1990-tallet.",
    "chapters": [
      {
        "heading": "Et offensivt blikkfang",
        "text": "Berg satte preg på Storhamar med hurtige bevegelser og tekniske løsninger. Han var en av spillerne publikum la merke til når klubben gikk inn i Dragons-epoken."
      },
      {
        "heading": "Europeisk gjennombrudd",
        "text": "Han var sentral i 1998/99-sesongen da Storhamar vant sin Continental Cup-gruppe i Amiens og avanserte i Europa for første gang. Samme sesong var han lagets poengkonge med 63 poeng."
      }
    ],
    "sources": [
      {
        "label": "Europeisk gjennombrudd",
        "url": "https://silarkivet.no/tidslinje/historien/"
      },
      {
        "label": "Sesongarkivet 1998/99",
        "url": "https://silarkivet.no/sesonger/"
      }
    ]
  },
  {
    "name": "Oskar Östlund",
    "lead": "Den svenske keeperen kom som et ubeskrevet blad og ble på fire sesonger en av Storhamars mest pålitelige sisteskanser.",
    "chapters": [
      {
        "heading": "Fra outsider til førstekeeper",
        "text": "Östlund kom fra østerriksk hockey og tok raskt nivået i Norge. Han etablerte seg som en keeper som ga Storhamar muligheten til å vinne jevne kamper."
      },
      {
        "heading": "En stor del av oppturen",
        "text": "Gjennom fire sesonger leverte han høye redningsprosenter og en lang rekke kamper uten baklengsmål. Etter 2018/19 gikk han videre til svenske Skellefteå AIK."
      }
    ],
    "sources": [
      {
        "label": "Spillerprofil",
        "url": "https://silarkivet.no/alumni/alumni-o/"
      }
    ]
  }
]

export const featuredPlayerStoryNames = ['Eirik Skadsdammen','Erik Kristiansen','Pål Johnsen','Tom Erik Olsen','Steinar Johansen','Joakim Jensen','Marthe Østeraas','Michael Smithurst'] as const

export function playerStoryForName(name: string): PlayerStory | undefined {
  return playerStories.find((story)=>story.name===name)
}
