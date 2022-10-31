# Prosjekt 3 - gruppe 67

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
## Kjøre e2e tester
#### `cd frontend`
#### `npm ...`
___
# Dokumentasjon
___
Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene som gruppa gjør (inklusive valg av komponenter og api).
Koden skal være lettlest og godt strukturert og kommentert slik at den er lett å sette seg inn i. Bruk av kommentarer skal være tilpasset at eksterne skal inspisere koden.
___
### Valg av rammeverk for graphQL i backend

### Valg av rammeverk for graphQL i frontend
-appollo client

### Datavalg
In this project we have chosen to use the “Spotify-Data 1921-2020” dataset from [Kaggle](https://www.kaggle.com/datasets/ektanegi/spotifydata-19212020). This dataset contains more than 160000 songs from Spotify Web API with top 100 songs included for each year. The dataset also includes song id, name of the song, artists, release date, danceability, popularity, duration, energy, and a lot more for each of the songs. This allowed us to include different data from the dataset in our website.

### Bibiliotek for stiler og ferdige komponenter
-mui

## Globale state mamagement
- appollo reaktive variabler
  
## Testing
For unit testing we created an input change test and various render tests to test the React components in our website. Since it is difficult to test the components that use the Apollo Client, we utilized *MockedProvider* which allows to define mock response for specific queries that are run as part of the tests. We also used Jest and the React Testing Library to render and find information on the screen along with *fireEvent* to test the input change.