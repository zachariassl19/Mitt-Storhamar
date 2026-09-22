# Changelog

Alle merkbare endringer i Mitt Storhamar dokumenteres her.

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
