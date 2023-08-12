## Må ordnes
- ikke bruke alert men vise feilen penere på siden

## Neste
- hvis en bruker faller ut, så kan man joine igjen direkte med localhost spiller lagring, må også ha en timer om spilleren er innaktiv.

- Bruke sessionStorage for å lagre id, username, hvilken view og documentRef i session
- ha eventListener til "beforeunload" som fjerner spiller fra spillet når de lukker tabben sin
- ViewRenderer må ha en useEffect som sjekker sessionStorage og laster game state basert på hvilen state spillet er i
- UseEffect til å hente data fra sessionStorage så det ikke skjer feiler
- Kan være en feil der man prøver å komme inn igjen i ett spill som er under IN_PROGRESS, der må man bare sjekk om username finnes og at man da kan bli med, men da må det håndteres at man ikke kan joine med ett brukernavn som finens også.

- se over koden, doc og struktur og push til git repo




# Meyer

### Kort om appen
- Multiplayer terningspill som er laget etter <a href="https://da.wikipedia.org/wiki/Meyer_(terningspil)">Mayer</a>
- Spillet er laget for å kunne spillers online.

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