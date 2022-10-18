const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Song {
    _id: ID!
    name: String!
    artists: [String]!
    year: Int!
    energy: Float!
    popularity: Int!
    tempo: Float!
    duration_ms: Int!
    danceability: Float!
    explicit: Boolean!
    acousticness: Float!
    key: Int!
    rating: Int
  }

  type SongQuery {
    songs: [Song!]
    page: Int!
    totalPages: Int!
  }


  input SongInput {
    artist: [String]!
    song: String!
    year: Int!
  }

  type Query {
    getSongs(page: Int, pageSize: Int, search: String, year: Int): SongQuery
  }

  type Mutation {
    createSong(song:SongInput): Song
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)