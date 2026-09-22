# Changelog

Alle merkbare endringer i Mitt Storhamar dokumenteres her.

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
