# Migrering: Storhamar HUB → Mitt Storhamar

Dette dokumentet skal hindre at prosjektet blir startet på nytt eller at fungerende funksjoner går tapt under flyttingen til GitHub.

## Kilde

Eksisterende app/prosjekt:

- Navn: Storhamar HUB
- Live: https://storhamar-hub-v2.zacharias09solberg.chatgpt.site
- Kjent prosjektstatus: aktiv
- Tidligere utviklingscheckpoint: `e1275b2`
- Tidligere release: `v0.9.3`

## Hovedregel

1. Ikke bygg appen fra bunnen av.
2. Ikke erstatt fungerende funksjoner med enklere demo-løsninger.
3. Migrer eksisterende kildekode først når den er tilgjengelig.
4. Gjør deretter små, kontrollerte endringer.
5. Funksjon prioriteres foran kosmetikk.

## Eksisterende retning

### Hjem

- Stor «Neste kamp»-seksjon.
- «Skal du dit?» med Ja / Kanskje / Nei.
- Kampdag-hub.
- Kommende kamper.
- Sesongstatus.
- Meritter og historisk inngang.
- På kampdag skal Hjem endre uttrykk fra kl. 00:00 og gå tilbake etter kampdagen.

### Kamper

- Kun Storhamar herrer senior skal telle i personlig supporterstatistikk.
- Planlagt oppmøte og faktisk oppmøte er separate data.
- Faktisk deltakelse kan markeres diskret som «DU VAR DER».
- CHL kan ha eget visuelt særpreg.
- Spesialkamper kan behandles særskilt.

### Reise

Reise skal være knyttet til kamp/tur, ikke bare være et løst enkeltfelt.

Datamodellen skal støtte:

- `Trip`
- `TripLeg`
- flere transportetapper
- til- og hjemreise
- flere kamper på samme tur
- lagrede ruter
- reisefølge
- planlagte og faktiske kostnader
- distanse
- transporttype

Transporttyper inkluderer blant annet bil, tog, supporterbuss, rutebuss, fly, taxi, gange, sykkel og annet.

### Økonomi

- Kjøp knyttet til kamp/tur.
- Utgifter samlet på ett sted.
- Unngå dobbelttelling når én tur dekker flere kamper.

### Karriere og statistikk

- Personlig supporterkarriere bygges fra canonical kampdata.
- Sesongstatistikk skal skille offisielle lagdata fra personlig supporterstatistikk.
- Gamle/importerte data skal ikke ukritisk blandes inn.

### Historie

Historiedelen skal støtte blant annet:

- tidslinje
- rekorder
- spillere
- arenaer
- Europa
- mesterskap
- større historiske fortellinger

Historiedelen kan være rikere og mer bok-/arkivaktig enn resten av appen.

## PuckHunter-import

Import skal:

- bare telle Storhamar herrer senior
- ignorere andre lag/kamper
- matche mot eksisterende kamper når mulig
- ikke gjette reise, kostnader eller andre personlige data

## Migreringsrekkefølge

1. Hent original kildekode / prosjekt-export.
2. Legg den inn i dette repoet uten funksjonelle omskrivinger.
3. Få install/build/test til å kjøre lokalt/CI.
4. Dokumenter faktisk stack og mappestruktur.
5. Verifiser Hjem, Kamper, Kampdag, Reise, Historie og Karriere.
6. Fortsett med den planlagte funksjonelle oppryddingen.

## Planlagt funksjonell opprydding etter migrering

- redusere antall hovedkategorier
- gjøre Hjem dynamisk på kampdag
- fikse kommende kamper
- fikse navigasjonsmarkering
- fikse Lagre reisen
- gjøre reise til en del av kampen
- implementere etter-kampregistrering
- legge inn reisefølge
- legge inn kjøp
- samle utgifter
- lage sesongstatistikk
- rydde inngangstype

## Ikke legg hemmeligheter i GitHub

Aldri commit:

- API-nøkler
- tokens
- passord
- private nøkler
- produksjonshemmeligheter

Bruk miljøvariabler og `.env` lokalt.
