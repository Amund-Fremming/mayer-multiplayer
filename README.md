#### Mayer

## Må ordnes
- Når host leaver game må andre spillere få info at spillet er avsluttet
- Hvis noen faller ut / refresher må de fjernes fra spillet eller lagre state i localstorage
- Ha timer slik at hvis noen bruker for lang tid blir de kicka.
- ikke bruke alert men vise feilen penere på siden

## Neste
- se over koden, doc og struktur og push til git repo
- Hindre folk å joine spill om state er IN PROGRESS
- Sjekke om man kan gjenbruke kode i transaction
- hente data med listener så ting er raskere



## Hva har jeg lært
- Hvordan man mounter/unmounter funksjoner og begrenser reads for å ikke få ekstremt mange kall til databasen der man ønsker real-time oppdateringer.
- Fikse data consistency med firebase der man har race conditions
- Håndtere flere brukere som interakter med hverandre samtidig real-time
- Håndtering av lyttere, og hvordan disse kan skape problemer om de ikke blir unmounted.