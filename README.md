#### Mayer


## Må ordnes
- Gjøre slik at det ikke er forskjell på KURT og kurt
- Når host leaver game må andre spillere få info at spillet er avsluttet
- Hvis noen faller ut / refresher må de fjernes fra spillet
- Ha timer slik at hvis noen bruker for lang tid blir de kicka.

## Neste
- HostLobby endrer gameStarted til true så gameLobby komponentet rendrer og endrer state i database til inProgress
- JoinLobby har onSnapshot for å oppdateres når host trykker start game og game state i db endres.
- Oppdaterer gameStarted state til inProgress, og host oppdaterer databasens game til inProgress.
- Lage gameLobby komponent som har en ready knapp og navnet til spillerne med rød eller grønn skrivt avhengig av om de er klare eller ikke.
- Er alle ready oppdatere i db state til started, og rendre game komponent

- onSnapshot på game slik at man får oppdateringer når andre spillere blir Ready = true, så når alle spillere er ready renderer man selve spillet
