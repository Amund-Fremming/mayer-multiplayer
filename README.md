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
- onSnapshot på game slik at man får oppdateringer når andre spillere blir Ready = true, så når alle spillere er ready renderer man selve spillet
- se over koden, doc og struktur og push til git repo

- Lage spillet
- Cleanup code
- Style (Bruk js fil med tailwind for style for headere og paragrafer og ting som skal være likt over alt)




## Hva har jeg lært
- Hvordan man mounter/unmounter funksjoner og begrenser reads for å ikke få ekstremt mange kall til databasen der man ønsker real-time oppdateringer.
- Fikse data consistency med firebase der man har race conditions