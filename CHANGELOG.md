# Changelog

Alle merkbare endringer i Mitt Storhamar dokumenteres her.

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

### Neste
- Koble Smart Game Day til kampdetalj/kampdag-UI.
- Fullfør kampdagen med faktisk attendance, inngangstype og billettkostnad.
- Marker Trip som `completed` først når gjennomført kampdag bekreftes.

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

### Neste
- Google Routes for automatisk km og tid.
- Bilinnstillinger og drivstoffkostnad.
- Ordentlig database i stedet for localStorage som hovedlagring.

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
