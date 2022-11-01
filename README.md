# Prosjekt 3 - gruppe 67

Husk å kjøre `npm i`  i frontend-mappa og i backend-mappa (hver for seg) første gang du kjører prosjektet.
___
## Kjøre backend

Gå inn i backend-mappa
#### `cd backend`
#### `npm run dev`
Alternativt (uten hot reloading):
#### `npm run deploy`
Du finner så serveren på [http://localhost:4000/graphql](http://localhost:4000/graphql/)
Merk: du må være på eduroam eller NTNU-VPN for at backend skal kunne aksessere databasen. Serveren vil ikke starte uten dette.
___
## Kjøre frontend 

Gå inn i frontend-mappa
#### `cd frontend`
#### `npm start`
Du finner så serveren på [http://localhost:3000](http://localhost:3000)
___

## Kjøre enhetstester

#### `cd frontend`
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
___
## Kjøre ende-til-ende tester
#### `cd frontend`
#### `npm run e2e`
___
# Dokumentasjon

## Valg av rammeverk for graphQL i [backend](backend/README.md)
Vi valgte tidlig å bruke mongoDB som database, og siden mongoose i node sammarbeider bra med denne valgte vi å skrive en backend i express. For å enkelt implementere graphQL i express sto vi mellom express-graphQL eller apollo server. Vi valgte expresss-graphQL fordi vi testet ut denne først, og pakken lot oss skrive mye backend-logikk på kort tid. Vi bruker skip og limit fra mongoose for å paginere i backend, og legger til en sort på slutten for å sortere resultatet. Når vi spør etter data legger vi til en regex i find()-metoden om brukeren søker etter data, slik at resutlatet kun inneholder sanger som matcher søkeordet.  
En mer detaljert oversikt over API-et finnes [her](/backend/README.md).

## Valg av rammeverk for graphQL i [frontend](frontend/README.md)
For å fetche data med graphql valgte vi å bruke Apollo client, da den gir oss innebygget chaching og et bibliotek for state management. For å hente data bruker vi useQuery- og useMutation hooks, da de sammarbeider godt med cachen. 

## Global state management 
For å oppdatere queries i andre komponenter har vi tatt i bruk reaktive variabler, slik at alle komponenter har mulighet til å endre på queries. Om en reaktiv variabel brukes som input for et query, oppfatter den endringen med en gang, og enten fetcher på nytt, eller henter fra cachene om den samme dataen har blitt hentet tidligere. Denne bruken av apollo gjør at siden oppfattes raskere, og at for eksempel rating-systemet kan oppdateres i frontend før appen har fått respons fra server.

## Datavalg
I dette prosjektet har vi valgt å bruke «Spotify-Data 1921-2020» som vi har hentet fra [Kaggle](https://www.kaggle.com/datasets/ektanegi/spotifydata-19212020). Dette datasettet inneholder mer enn 160 000 forskjellig type sanger fra Spotify Web API, med topp 100 sanger fra hvert år. Hver sang i datasettet inneholder 19 forskjellige kategorier som for eksempel sang id, navn på sangen, artister, utgivelses dato, «danceability», popularitet, varighet og energi. Det å ha flere forskjellige kategorier har gitt oss mer fleksibilitet for valg av hvilke kategorier vi vil inkludere i vår nettside. Vi valgte å ikke inkludere alle kategorier som var tilgjengelig i datasettet fordi en del av de ikke ville vært interessante for brukeren. I tillegg kunne en stor mengde forskjellig innhold gjort at nettsiden virket uorganisert.

## Responsiv layout og eksterne komponenter 
For å oppfylle kravet om valg av tredjeparts komponenter bestemte vi oss tidlig for å benytte oss av React biblioteket Material UI (MUI), for å bygge brukergrensesnittet. MUI komponenter er brukt til styling på hele nettsiden, blant annet på search-bar, filter og pagination. Collapse-komponenten ble brukt for at en bruker skal kunne trykke på en sang for å vise mer informasjon om sangen, flere artister og annen relevant informasjon. 

For å vise frem listen med sanger ble MUI Grid brukt for plassering av elementer på siden, og for å sørge for responsivitet og gjennomgående konsistens i layout. Vi har stylet komponenter ved bruk av inline CSS gjennom MUI, og benyttet oss ikke av egne CSS-styling-filer. Vi syns ikke det var nødvendig å bruke det når MUI gir mye gratis når det kommer til styling. Det meste ble gjort ved å bruke “sx-property” som er en snarvei for å definere styling av MUI-komponenter. For å få elementer til å tilpasse seg mindre skjermstørrelser som på f.eks. mobil eller Ipad, brukte vi MUIs Flexbox properties og sx-property “flexWrap”. FlexWrap sørger for at elementer plasseres under hverandre når skjermen blir liten og for å unngå overflow.  

## Testing
For testing har vi laget en snapshot-test, og flere enhetstester. I enhetstestene blir forskjellige deler av koden testet, blant annet testes det at en input verdi blir satt når det blir foretatt et søk. De andre enhetstestene er render-tester som sjekker at ulike deler av nettsiden laster inn korrekt, eller eksisterer på nettsiden. Fordi det er vanskelig å teste komponenter som bruker Apollo Client, valgte vi å bruke Apollos *MockedProvider* som gjør det mulig å definere mock-respons for en spesifikk forespørsel som kjører som en del av testene. Vi har også brukt Jest og React Testing Library til å rendre og finne informasjon på skjermen samt *fireEvent* til å teste endring i input.