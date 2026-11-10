# Mitt Storhamar · privat Android (fase 1)

## Mål
- Fortsett med eksisterende React/PWA og historiedata; pakk web-UI inn i Capacitor 8.
- Reiser: **brukeren velger selv avreisedato og klokkeslett** i Reiseplanleggeren. Tidspunktet overstyrer beregnet DRA og brukes i både web- og Android-varsel, selv når reiseetappenes varighet ikke er kjent.
- Automatisk posisjon **under en aktiv, brukerstartet reiseøkt**. Ingen døgnkontinuerlig sporing. GPS kan startes manuelt fra 72 timer før kamp. Manuelt valgt avreisetid starter ikke GPS automatisk i lukket app.
- Posisjon i bakgrunnen kan fungere med skjermen låst så lenge Android tillater en lokasjonstype-foreground service og brukeren har gitt tillatelse.
- Ingen koordinathistorikk lagres eller sendes til Supabase eller GitHub.
- Android-planlagte varsler om kamp i morgen, kampdag og avreise når varslene er aktivert.
- «Bare meg»: installasjon på din telefon, privat lokal økt, ingen publisert posisjon. Nettutgaven på GitHub Pages er fremdeles offentlig tilgjengelig og har IKKE kontobasert privat tilgang.

## Hva som skjer i fase 1
1. Capacitor 8 Android-konfigurasjon med Vite sin relative asset-base for APK, eksisterende GitHub Pages-build uendret.
2. Velg egen avreisetid under Kamp → Reise, eller bruk automatisk beregning. Start/stopp reiseøkt fra Mer → Smart reisemodus. Appen ber om tillatelser **ved aktivering**. En aktiv Android-reise viser et vedvarende systemvarsel. GPS leses i et dynamisk avstandsintervall mot arenaen; ingen rå koordinater lagres.
3. Lokale Android-varsler planlegges på selve enheten når varselinnstillingen er på. Alle planlagte meldinger kan slettes ved avslag.
4. GitHub Actions bygger en Android DEBUG APK som CI-artifact. Det er **ikke** en produksjonssignert release. Debug-signatur kan endres mellom workflow-kjøringer, så for å bevare data og få installasjon over tidligere versjoner trengs en permanent, sikker signeringsnøkkel.
5. Verifisering på en fysisk Samsung må gjøres før man kan love bakgrunnsoppdatering og eksakt varslingspunkt.

## Tillatelser og begrensninger
- Android må gi posisjon (presis hvis ønskelig). Lokaliserings-plugin viser vedvarende notifikasjon mens reiseøkten kjører. Android 13+ krever varseltillatelse.
- Fordi Android 14+ begrenser oppstart av foreground service i bakgrunnen, kan ikke en reiseøkt starte automatisk fra en lukket app uten brukerens handling. Det er med vilje **én starthandling før turen**, deretter automatisk sporing mens økten er aktiv.
- Tidspunkt for automatisk stopp kan forsinkes dersom Android stopper WebView-prosessen. Økten begrenses til kamp + 5 timer og stoppes ved neste åpning hvis utløpt. En knapp for umiddelbar stopp skal alltid være tilgjengelig.
- Batterisparing, manglende GPS-dekning og systemets Doze kan forsinke oppdateringer/varsler. Varsler er planlagt lokalt, ikke FCM-push; ingen push fra server mens appen er avslått.
- «Rundt avreise»-varsel bruker manuelt valgt dato/klokkeslett når brukeren har valgt det. Ved automatisk DRA kreves reiseetapper med reisetid; ingen reisetid skal oppfinnes.
- Sikkerhetskopi som allerede brukes er frivillig. GPS-koordinater lagres ikke i felter med prefikset `mitt-storhamar:` som sky-synkroniseres.

## Kommandoer lokalt
```sh
npm install
npm run build:android
npx cap add android
npx cap sync android
npx cap open android
```

## Videre leveranser
- Fase 2: fysisk Android-test på Samsung S25, batteri-/tillatelsestester med skjerm låst, riktig appikon, stabil signering og privat installasjon.
- Fase 3: varig privat signeringsnøkkel, kontrollert appoppdateringsflyt uten tap av data, valgfri FCM for sanntidsvarsler, og eventuelt private autentiseringskrav for web.
- Fase 4: under en aktiv reise kan posisjon brukes til prognose for reisetid og forslag om avgang. Det krever rutetjeneste og må håndteres uten å lagre eller dele GPS uten samtykke.

Kilder: https://capacitorjs.com/docs/android ; https://capacitorjs.com/docs/apis/local-notifications ; https://github.com/capacitor-community/background-geolocation ; https://developer.android.com/develop/sensors-and-location/location/permissions
