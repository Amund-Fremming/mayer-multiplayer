#### Mayer

## Må ordnes
- Når host leaver game må andre spillere få info at spillet er avsluttet
- Hvis noen faller ut / refresher må de fjernes fra spillet eller lagre state i localstorage
- Ha timer slik at hvis noen bruker for lang tid blir de kicka.
- ikke bruke alert men vise feilen penere på siden

## Cleanup til koden
- Der det er like variabler i funksjoner, ha heller globale variabler
- er funksjoner like i forskjellige komponenter, lag en fil med funskjonen og importer den.
- Sørg for at alle funksjoner eller apier bruker try catch og har error handling

## Neste
- se over koden, doc og struktur og push til git repo
- Sette state til IN PROGRESS når alle er ready
- Hindre folk å joine spill om state er IN PROGRESS
- endre hosting domain

- Lage spillet
- Style (Bruk js fil med tailwind for style for headere og paragrafer og ting som skal være likt over alt)
- Cleanup school



## Hva har jeg lært
- Hvordan man mounter/unmounter funksjoner og begrenser reads for å ikke få ekstremt mange kall til databasen der man ønsker real-time oppdateringer.
- Fikse data consistency med firebase der man har race conditions
- Håndtere flere brukere som interakter med hverandre samtidig real-time
- Håndtering av lyttere, og hvordan disse kan skape problemer om de ikke blir unmounted.