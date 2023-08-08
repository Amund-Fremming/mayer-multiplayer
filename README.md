#### Mayer


## Må ordnes
- Gjøre slik at det ikke er forskjell på KURT og kurt
- Når host leaver game må andre spillere få info at spillet er avsluttet
- Hvis noen faller ut / refresher må de fjernes fra spillet
- Ha timer slik at hvis noen bruker for lang tid blir de kicka.
- ikke bruke alert men vise feilen penere på siden

## Cleanup til koden
- Der det er like variabler i funksjoner, ha heller globale variabler
- er funksjoner like i forskjellige komponenter, lag en fil med funskjonen og importer den.
- Sørg for at alle funksjoner eller apier bruker try catch og har error handling

## Neste
- Lage gameLobby komponent som har en ready knapp og navnet til spillerne med rød eller grønn skrivt avhengig av om de er klare eller ikke.
- Er alle ready oppdatere i db state til started, og rendre game komponent

- onSnapshot på game slik at man får oppdateringer når andre spillere blir Ready = true, så når alle spillere er ready renderer man selve spillet


## Hva har jeg lært
- Hvordan man mounter/unmounter funksjoner og begrenser reads for å ikke få ekstremt mange kall til databasen der man ønsker real-time oppdateringer.
