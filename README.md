# Mitt Storhamar

Personlig Storhamar-app for kampdag, kamper, reiser, supporterstatistikk og klubbhistorie.

Dette repoet er den nye hovedbasen for videreutviklingen av den eksisterende **Storhamar HUB**-appen.

## Viktig prinsipp

**Ikke start appen på nytt. Ikke bygg om ting som allerede fungerer uten grunn.**

Målet er å migrere den eksisterende appen hit og videreutvikle den stegvis.

## Eksisterende app

- Tidligere navn: Storhamar HUB
- Nytt navn: Mitt Storhamar
- Eksisterende live-versjon: https://storhamar-hub-v2.zacharias09solberg.chatgpt.site
- Mobil-først / PWA

## Kjerneområder

- Hjem / Neste kamp
- Dynamisk kampdag
- Kamper og kampdetaljer
- Skal du dit? Ja / Kanskje / Nei
- Faktisk oppmøte
- Reise knyttet til kamp
- Trip / TripLeg
- Reisefølge
- Kjøp og utgifter
- Sesongstatistikk
- Supporterkarriere
- Storhamar-historie
- Rekorder, spillere, arenaer og Europa

## Migrering

Se [`docs/MIGRATION.md`](docs/MIGRATION.md) før større endringer.

## Sikkerhet

API-nøkler, tokens, passord og andre hemmeligheter skal aldri commits til repoet. Bruk miljøvariabler for slike verdier.
