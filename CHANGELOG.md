# Changelog

Alle merkbare endringer i Mitt Storhamar dokumenteres her.

## [0.4.2] – 2026-09-22

### Standardforbruk per 100 km
- Bilberegningen har nå også automatisk standardforbruk per 100 km, slik at kostnaden kan beregnes uten at brukeren først må kjenne bilens eksakte forbruk.
- Bensin: 6,46 l/100 km.
- Diesel: 5,48 l/100 km.
- Strøm: 15,61 kWh/100 km.
- Tallene er praktiske standardestimat beregnet som enkelt snitt av Statens vegvesens tilgjengelige 2026-segmentverdier for kompakt-, mellomklasse- og SUV-biler.
- Når energitype byttes, settes både riktig norsk standardpris og standardforbruk automatisk.
- Brukeren kan fortsatt overstyre standardforbruket med bilens faktiske forbruk.

## [0.4.1] – 2026-09-22

### Energipriser og bilkostnad
- Bilkostnad bruker nå norske gjennomsnittspriser som standard i stedet for tom energipris.
- Bensin: 19,42 kr/l, basert på SSBs gjennomsnittlige utsalgspris for blyfri 95 oktan i august 2026.
- Diesel: 21,48 kr/l, basert på SSBs gjennomsnittlige utsalgspris for avgiftspliktig diesel i august 2026.
- Strøm: 1,179 kr/kWh, basert på SSBs nasjonale husholdningssnitt for kraft, nettleie og avgifter etter offentlig støtte i 2. kvartal 2026.
- Når energitype byttes mellom Strøm, Bensin og Diesel settes riktig norsk gjennomsnittspris automatisk som nytt utgangspunkt.
- Prisgrunnlaget og perioden vises i Reise-UI-et.
- Brukeren kan fortsatt overstyre standardprisen dersom faktisk pumpe-/ladepris er kjent.
- Selve forbruket til bilen lagres separat og brukes i formelen `km / 100 × forbruk × energipris`.

## [0.4.0] – 2026-09-22

### Reise er bygget om
- Reise planlegges nå som stopp i riktig rekkefølge i stedet for at brukeren må opprette hver etappe manuelt.
- Standardflyt er `Hjem → arena → Hjem`.
- Det kan legges til stopp før arena og på hjemveien, for eksempel `Hjem → Ilseng → CC Amfi → Hjem`.
- `TripLeg` beholdes under panseret og bygges automatisk mellom stoppene.
- Hvert segment kan fortsatt ha egen reisemåte: bil, tog, supporterbuss, rutebuss, fly, taxi, gange, sykkel eller annet.
- Stopp kan redigeres og fjernes uten at brukeren trenger å håndtere etappen direkte.

### Bil og kostnad
- Én global bilinnstilling brukes på alle bilsegmenter.
- Bil kan settes til Strøm, Bensin eller Diesel.
- Forbruk og energipris lagres lokalt på enheten.
- Bilpris beregnes som `km / 100 × forbruk × energipris`.
- Manglende energipris eller forbruk stopper ikke reiseplanleggingen.

### Andre reisemåter
- Supporterbuss og andre betalte reisemåter kan få manuell pris per segment.
- Gange og sykkel får 0 kr transportkostnad.
- Total km, tid og kostnad summeres over hele reisen.
- DRA bruker bare reisetiden fram til arenaen.

### Neste
- Koble stoppmodellen til en sikker Google Routes-løsning for automatisk km og kjøretid.
- Utvide arena-registeret med alle arenaer i 2026/27.
- Lagre privat `Hjem`-lokasjon uten å hardkode adresse i offentlig repo.
- Entur for kollektiv der det er relevant.

## [0.3.0] – 2026-09-22

### Lagt til
- Smart Kampdag direkte på kampdetaljen.
- GPS-status for utenfor, nær arena og ved arena.
- Start/stopp av GPS-følging mens appen er aktiv på kampdag.
- Engangssjekk av posisjon med «Sjekk nå».
- GPS-observasjoner lagres som `near_arena`, `arrived_at_arena` og `left_arena` uten kontinuerlig rått GPS-spor.
- GPS kan foreslå at brukeren var på kampen, men kan ikke registrere attendance automatisk.
- Egen «Fullfør kampdagen»-flyt etter kamp.
- Faktisk attendance: «Jeg var der», «Jeg var ikke der» eller «Husker ikke».
- Inngangstype og billettkostnad på gjennomført kampdag.
- Lagret kampdagsresultat vises som «DU VAR DER» / «IKKE DELTATT».
- Trip markeres som `completed` først når kampdagen fullføres med «Jeg var der».
- Sentral temporal logikk for framtidig kamp, kampdag før start, pågående kamp, post-game og ferdig kamp.

### Viktig regel
- `attendancePlan = yes` betyr kun at brukeren planlegger å dra.
- Planlagt «Ja» teller aldri som kamp sett.
- Planlagte km og planlagte reiser teller ikke i ny karrierestatistikk.
- Først `attendanceActual = attended` på en fullført kampdag gjør at kampen teller.

### Neste
- Utvide Arena-registeret med GPS-punkt for alle arenaer i 2026/27.
- Google Routes for automatisk km og reisetid.
- DRA basert på automatisk reisetid.
- Bilinnstillinger og drivstoffkostnad.
- Reisefølge og kjøp i post-game-flyten.

## [0.2.1] – 2026-09-22

### Endret
- «Ja» før kamp er kun attendance-plan og teller aldri som en sett kamp.
- Planlagte reiser skal ikke telle i karrierestatistikk før kampdagen er bekreftet som gjennomført.
- Lagt inn egen statistikkregel som kun teller bekreftet `attendanceActual = attended` og fullførte reiser.

### Smart Game Day-grunnmur
- Canonical Arena-register er startet.
- CC Amfi er lagt inn med aliaser og geofence-radius.
- GPS kan klassifisere `near_arena`, `arrived_at_arena` og `left_arena`.
- Rå GPS-posisjon skal ikke brukes som attendance-fasit eller lagres som kontinuerlig spor.
- GPS kan senere foreslå «Det ser ut som du var der – bekreft?», men kan aldri sette `attendanceActual` automatisk.

## [0.2.0] – 2026-09-22

### Lagt til
- Egen kampdetalj når du trykker på en kamp.
- Kampinfo, resultat, arena og attendance-plan samlet på kampdetaljen.
- Trip/TripLeg-modell for reiser knyttet til kamp.
- Flere reiseetapper med bil, tog, supporterbuss, rutebuss, fly, taxi, gange, sykkel og annet.
- Full CRUD på etapper: opprette, redigere, slette, duplisere og flytte opp/ned.
- Til-arena og hjemreise som egne retninger.
- Manuell km, reisetid og estimert kostnad per etappe.
- Foreløpig DRA-beregning når reisetid er kjent.
- Reisen persisteres lokalt og finnes fortsatt etter refresh.
- Versjonsnummer vises under Mer.
- SemVer-regler dokumentert i `docs/VERSIONING.md`.

## [0.1.0] – 2026-09-22

### Lagt til
- Første GitHub-versjon av Mitt Storhamar.
- Mobil-først React/TypeScript/Vite-app.
- GitHub Pages-deploy.
- Hjem med Neste kamp og kampdag-modus.
- 2026/27-kamper med treningskamper, CHL og EHL.
- Resultater på allerede spilte kamper.
- Laglogoer med fallback.
- Attendance-plan: Ja / Kanskje / Nei.
- Import av gammel Storhamar HUB JSON lokalt.
- Karriere- og Historie-grunnstruktur.
