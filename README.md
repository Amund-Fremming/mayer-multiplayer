### Må ordnes
- Lage popup hvordan man legger til appen på hjemskjerm og at det er bedre der.
- (bildeopplastning ved username)???
- ikke bruke alert men vise feilen penere på siden
- Kunne sende link via snapchat,messenger eller meldinger til ett spill
- Endre fra create-react-app til next?

### Neste
- Hvis man bruker for lang tid kaster spillet terninger automatisk, skjer dette 3 ganger fjernes man fra spillet
- Fikse sjekk som finner ut om man slår personen som slo terninger før ved å ha høyre verdi eller mayer/lille mayer
- Varsle spiller som ble busted at han ble busted

- Vise hva forrige spiller fikk
- lage ett bord som viser de andre spillerne og hva de kastet, eller vise ikke kastet

- Lage tutorial komponent, avsnitt med grafisk figur (kvist)

- (Finn måte å avslutte spillet)
- (Regne ut antall slurker, ut ifra hvor feil man busta?)

- Lage design i figma
- Kjøre A/B testing på design
- beta testing med noen få brukere

- Kontakt, info side der man kan sende inn bugs, og kontakte utvikler
 
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