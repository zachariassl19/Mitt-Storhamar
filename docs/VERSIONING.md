# Versjonering

Mitt Storhamar bruker semantisk versjonering: `MAJOR.MINOR.PATCH`.

Eksempler:

- `1.0.0` – første stabile hovedversjon
- `1.0.1` – liten feilretting uten nye store funksjoner
- `1.1.0` – ny funksjon som er bakoverkompatibel
- `2.0.0` – større endring som kan endre arbeidsflyt eller datamodell vesentlig

## Før 1.0.0

Så lenge kjernefunksjonene fortsatt bygges bruker prosjektet `0.x.y`.

- PATCH: feilretting eller liten visuell justering
- MINOR: ny ferdig funksjon eller større del av appen

Når kampdetalj, attendance, reise/persistens og den grunnleggende appflyten er stabile kan prosjektet løftes til `1.0.0`.

## Hver release

Ved versjonsendring skal vi:

1. oppdatere `version` i `package.json`
2. oppdatere `CHANGELOG.md`
3. sørge for at build passerer
4. publisere samme versjon til GitHub Pages

Versjonsnummeret skal også kunne vises inne i appen under Mer.
