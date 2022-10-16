const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Song {
    _id: ID!
    name: String!
    artists: [String]!
    year: Int!
  }


  input SongInput {
    artist: [String]!
    song: String!
    year: Int!
  }

  type Query {
    songs(page: Int, limit: Int):[Song!]
  }

  type Mutation {
    createSong(song:SongInput): Song
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)