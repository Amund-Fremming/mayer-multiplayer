## Må ordnes
- bildeopplastning ved username
- ikke bruke alert men vise feilen penere på siden
- Er en spiller inaktiv for lenge må spilleren sparkes ut av spillet.

## Neste
- Lage component for PlayersTurn og WaitingTurn
- onSnapshot på currentPlayer
- Vise PlayersTurn når currentPlayer er ditt brukernavn

- Når din tur kan man velge å buste, eller kaste terning
- Når du har kasta kan du skrive inn hvor mye du fikk selv, eller lyve
- Spillet oppdaterer valget ditt og det går til neste person

- Finn måte å avslutte spillet
- timer når det er din tur, hvis ud bruker for lang tid så blir du skippa, 3 skips blir du kasta ut.

- Style spillet



# Meyer

### Kort om appen
- Multiplayer terningspill som er laget etter <a href="https://da.wikipedia.org/wiki/Meyer_(terningspil)">Mayer</a>
- Spillet er laget for å kunne spilles online.

### Hva har jeg lært
- Hvordan man mounter/unmounter funksjoner og begrenser reads for å ikke få ekstremt mange kall til databasen der man ønsker real-time oppdateringer.
- Fikse data consistency med firebase der man har race conditions
- Håndtere flere brukere som interakter med hverandre samtidig real-time
- Håndtering av lyttere, og hvordan disse kan skape problemer om de ikke blir unmounted.
- Hvordan hente data mer effektivt, så programmet blir raskere for brukeren.
- Gjenbruk av kode.

### Hva skal jeg gjøre annerledes neste gang
- Lage de fleste kallene til databasen først og så sende referansen videre til andre komponenter, kontra å hente ut referansen i hvert komponent. Blir mer effektivt program.
- Bli bedre på å skrive kommentarer og dokumentasjon.
- Ha kundemøter for å gjøre appen mer brukervennlig.

### How to use gitpush.sh
list all commands
```
sh gitpush.sh help
```
Push to git, create a build and deploy to firebase, this requires that you have initialized your firebase project first.
```
sh gitpush <commit msg> prod
```