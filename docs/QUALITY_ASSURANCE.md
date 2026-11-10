# Kvalitetskontroll – Mitt Storhamar

Oppdatert 10. november 2026. Denne listen er en testplan, ikke en påstand om at alle scenarier er manuelt testet.

## Automatisk kontroll i GitHub Actions
- Build: Vitest, TypeScript og Vite.
- System tests: terminliste/ID, lagring, DRA, varsler, personlige data og historiedatastruktur.
- Android debug: teknisk bygg. En vellykket APK-build beviser **ikke** at varsler eller GPS fungerer med låst skjerm.

## Realistisk testreise – gjør på faktisk Android-enhet
1. Svar Ja på en kommende kamp. Bekreft grønn markering i Kamper, Hjem og kampdetaljer. Endre til Kanskje og Nei; kontroller at alle visninger oppdateres.
2. Lagre en reise med automatisk beregnet avreise. Bytt til Jeg bestemmer selv og velg en dato dagen før. Sammenlign DRA i planlegger, Hjem og dynamisk Kampdag.
3. Bytt til automatisk og tilbake uten å lagre. Manuelt utkast skal fortsatt stå. Lagre i automatisk modus; det manuelle tidspunktet skal ikke følge med.
4. Aktiver Android-varsler. Velg Nei etter en lagret reise; ingen tidligere planlagt avreise- eller fullføringspåminnelse skal ligge i Android.
5. Fullfør en kampdag med oppmøte, billett, reise og kjøp. Kontroller summer i Min Storhamar. Registrerte anslag må være tydelig merket som anslag.
6. Prøv å lagre med ugyldig avreisedato. Både reise og faktisk oppmøte skal forbli uendret.
7. Slett et kjøp og en reise etter bekreftelse. Kontroller at totalsummene oppdateres og at slettingen består etter omstart.

## Synk og langvarig bruk
1. Last ned en lokal sikkerhetskopi fra Mer og kontroller at filen kan importeres etter bekreftelse.
2. På mobil og PC: endre den samme kampens Ja/Kanskje/Nei fra begge enheter, med én enhet offline. Den nyeste daterte endringen skal vinne når begge synkroniserer.
3. Slett en reise offline og la den andre enheten fremdeles ha en eldre kopi. Reisen skal ikke komme tilbake ved synk.
4. Test både ny installasjon og eldre data uten timestamps/markører.
5. Test tre sesonger med mange lokale registreringer og kontroller at ingen rader forsvinner, dobbelttelles eller kobles til feil kamp.
6. Kontroller at du ikke mister lokale data etter avinstallering/reinstallering uten backup; privat synk/backup må være aktiv for gjenoppretting.

## Mobil og tilgjengelighet
- Test minst smal 320px-enhet, normal Android-telefon og bred skjerm.
- Scroll Min Storhamar: fanene skal ligge synlig under toppfeltet, ikke over statistikken.
- Åpne Historie og bla i 100+ oppføringer. Se etter avkuttede navn, eksterne bilder som ikke lastes og for små trykkflater.
- Test skjermtastatur, større systemfont, TalkBack og nettleserens tilbakeknapp.
- Test appen uten internett etter at hovedsiden er åpnet minst én gang.

## Android-begrensninger som krever fysisk test
- Foreground-service-GPS med låst skjerm, batterisparemodus, tap av dekning, avslag på posisjon og telefonstart.
- Lokale varsler når appen er lukket, Android har Doze, tillatelse trekkes tilbake og kampstart endres.
- GPS starter ikke automatisk ved valgt avreisetid. Brukeren starter reisen manuelt.
- Android-debug APK er ikke en stabil signert produksjonsutgave. Endelig installasjon/oppdatering uten datatap krever fast signeringsnøkkel.

## Fremtidige forbedringer som ikke er levert i v0.22.1
- En autoritativ automatisk terminlisteoppdatering med stabile kamp-ID-er og varsling ved endringer.
- En fullstendig import av kamp- og spillerstatistikk for hver sesong i SIL-arkivet.
- En samlet år-for-år-kampdatabase med samme personlige ID-system og datavask for eldre data.
- Automatisk push fra server/FCM når appen er lukket er ikke bygget.
- Manuell Android-test av posisjon og varsler på en reell telefon er fremdeles nødvendig.
