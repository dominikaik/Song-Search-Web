const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Song {
    _id: ID!
    artist: String!
    song: String!
    year: Int!
  }


  input SongInput {
    artist: String!
    song: String!
    year: Int!
  }

  type Query {
    songs(year: Int, search: String):[Song!]
  }

  type Mutation {
    createSong(song:SongInput): Song
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)