# Mitt Storhamar – Historiearkivet

Dette dokumentet er arbeidskontrakten for Historie-satsingen fra v0.15.x.

## Mål

Historie skal være et faktisk digitalt Storhamar-arkiv inne i appen. Det skal ikke reduseres til noen få kort som sender brukeren videre til eksterne nettsider.

Eksterne kilder brukes til research, kontroll, kreditering og dokumentasjon. Selve historien skal presenteres i Mitt Storhamar.

## Hovedkategorier

Primære deler:

- Sesonger
- Meritter
- Drakter
- Legender / I taket
- Spillere
- Europa
- Rekorder
- Arenaer
- Tidslinjen

Utvidede deler:

- Trenere
- Kapteiner
- Klubbidentitet
- Supporterkultur

Kategoriene skal kobles sammen. En drakt skal kunne peke til sesonger, spillere og store øyeblikk. En spiller skal kunne peke til sesonger, meritter og drakter. En sesong skal kunne peke til stall, trener, arena, meritter, Europa og relevante historiske hendelser.

## Research-regler

1. SIL-arkivet er hovedkilde for historisk Storhamar-materiale.
2. Prosjekteier har opplyst at materiale fra SIL-arkivet kan brukes i Mitt Storhamar.
3. Offisielle klubbkilder, CHL og andre primærkilder brukes når de kan bekrefte eller utfylle informasjon.
4. Elite Prospects kan brukes som kontrollkilde for spiller- og lagdata, men skal ikke skrapes automatisk.
5. Uenighet mellom kilder skal dokumenteres og ikke skjules.
6. Ingen historiske fakta skal diktes opp for å fylle tomrom.
7. Manglende tall skal være manglende/ukjente, aldri automatisk `0`.
8. Hvert arkivobjekt får `completeness`: `stub`, `partial` eller `verified`.
9. `verified` brukes først når vesentlig innhold er kontrollert mot kildene.
10. Lange historiefortellinger skal bevare viktige detaljer. De skal ikke kuttes ned til en ekstern «Les mer»-lenke.

## Bilder og media

Målet er å bruke så mange ekte og relevante bilder som mulig.

Prioritet:

1. Ekte historiske bilder fra SIL-arkivet som vi har tillatelse til å bruke.
2. Offisielle Storhamar-bilder som kan brukes på lovlig måte.
3. Andre historiske originalkilder med tydelig kilde og rettighetsgrunnlag.
4. Grafisk placeholder kun mens ekte materiale mangler.

AI-genererte bilder skal ikke brukes som om de var historisk dokumentasjon.

Hvert bilde/mediaobjekt skal så langt det er mulig ha:

- kilde
- kreditering
- bildetekst
- alternativ tekst
- tilknyttede sesonger/personer
- rettighetsnotat

Bilder skal ikke bare hardkodes tilfeldig i React-komponenter. De registreres som strukturerte `ArchiveMedia`-objekter slik at samme bilde kan brukes riktig flere steder.

## Sesonger

Målet er full sesongdekning fra klubbens tidligste sesonger til dagens sesong.

En sesongside kan inneholde:

- sesongnavn og tidsperiode
- trener(e)
- kaptein(er)
- stall
- draktene som ble brukt
- hjemmebane(r)
- serie og tabell
- kamper og resultater
- sluttspill/NM
- Europa
- treningskamper der de er historisk relevante
- poeng-/målkonger
- meritter
- store kamper og hendelser
- bilder
- en ordentlig sesongfortelling
- kilder

Ikke alle gamle sesonger vil ha alle felter tilgjengelig. Datamodellen skal tåle dette uten å late som dataene er komplette.

## Drakter

Draktarkivet skal være visuelt og bruke ekte bilder i størst mulig grad.

En drakt kan inneholde:

- bilde(r)
- sesonger/periode
- hjemme/borte/Europa/spesial osv.
- produsent
- farger og designhistorie
- sponsorer når dette er dokumentert
- kjente spillere som brukte drakten
- store øyeblikk knyttet til drakten
- relaterte meritter
- kilder og kreditering

## Legender / I taket

Dette er en egen, kuratert del og skal ikke blandes sammen med det generelle spillerarkivet.

En legendeprofil kan inneholde:

- navn
- nummer
- periode i Storhamar
- posisjon/rolle
- statistikk når tilgjengelig
- meritter
- bilder
- hvorfor personen er hedret
- dato/hendelse for hedringen når dokumentert
- relaterte sesonger og øyeblikk

## Meritter

Meritter skal ikke bare være en liste med årstall.

Et mesterskap kan få egen side med:

- sesong
- konkurranse
- veien fram til tittelen
- avgjørende kamper/finaler
- motstander(e)
- nøkkelspillere
- trener
- bilder
- relaterte drakter
- historiefortelling

## Europa

Europa skal dekke relevante europeiske turneringer og kampanjer, med motstandere, kamper, resultater, arenaer, bilder og historisk kontekst.

## Rekorder

Rekorder må ha tydelig definisjon, kilde og kontekst. Eksempelvis skal en seiersrekke spesifisere hvilke kamper/konkurranser rekorden gjelder dersom kilden gjør dette mulig.

## Kildelenker i UI

Kildene skal være tilgjengelige, men diskrete. En bruker skal ikke måtte forlate appen for å forstå historien.

Bra:

> En full historietekst i appen, etterfulgt av «Kilder».

Ikke bra:

> «Storhamar vant NM. Les mer på SIL-arkivet.»

## Teknisk modell

Historie-data ligger separat fra brukerens personlige data. Historisk innhold skal kunne oppdateres i kode/release uten å påvirke attendance, reiser, kjøp eller privat synk.

Arkivobjekter bruker stabile ID-er og `related`-koblinger, slik at Historie senere kan kobles mot Min Storhamar. Eksempler:

- arena → «Du har sett X kamper her»
- sesong → «Du var på X kamper denne sesongen»
- spiller → kamper brukeren faktisk var på

## Release-retning

- v0.15.0: datamodell, kilderegister og arkivstruktur
- v0.15.x: research og innhold kategori for kategori
- senere: kobling mellom Historie og personlig supporterkarriere

Kvalitet og dokumentasjon prioriteres foran hastighet.
