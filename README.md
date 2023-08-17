### Må ordnes
- Lage popup hvordan man legger til appen på hjemskjerm og at det er bedre der.
- (bildeopplastning ved username)???
- ikke bruke alert men vise feilen penere på siden
- Kunne sende link via snapchat,messenger eller meldinger til ett spill
- Endre fra create-react-app til next?

### Neste
- Gjøre metodene i playerturn som transaksjoner, de oppdaterer dat feil i databasen. 
- Hvis begge terninger viser 0 skal ingen verdi vises eller ikke kastet.
- Lage tutorial komponent, video eller how to?
- Fullføre waitingturn turn og playerturn

- Ordne så spille kan velge om å lyve / bust / spille ærlig

- Finn måte å avslutte spillet
- Hvis spilleren som har tur blir borte eller forlater, må neste spileller oppdateres og han må fjernes fra spillet.
- timer når det er din tur, hvis du bruker for lang tid så blir du skippa, 3 skips blir du kasta ut.

- Style spillet 
 
<br/><br/>


# Meyer

### Kort om appen
- Multiplayer terningspill som er laget etter <a href="https://da.wikipedia.org/wiki/Meyer_(terningspil)">Mayer</a>
- Spillet er laget for å kunne spilles online.

### Hva har jeg lært
- Hvordan man mounter/unmounter funksjoner og begrenser reads for å ikke få ekstremt mange kall til databasen der man ønsker real-time oppdateringer.
- Lært litt om å debouce funksjoner
- Fikse data consistency med firebase der man har race conditions
- Håndtere flere brukere som interakter med hverandre samtidig real-time
- Håndtering av lyttere, og hvordan disse kan skape problemer om de ikke blir unmounted.
- Hvordan hente data mer effektivt, så programmet blir raskere for brukeren.
- Gjenbruk av kode.

### Hva skal jeg gjøre annerledes neste gang
- Lage de fleste kallene til databasen først og så sende referansen videre til andre komponenter, kontra å hente ut referansen i hvert komponent. Blir mer effektivt program.
- Bli bedre på å skrive kommentarer og dokumentasjon.
- Ha kundemøter for å gjøre appen mer brukervennlig.

<br />

### How to use gitpush.sh
list all commands
```
sh gitpush.sh help
```
Push to git, create a build and deploy to firebase, this requires that you have initialized your firebase project first.
```
sh gitpush <commit msg> prod
```