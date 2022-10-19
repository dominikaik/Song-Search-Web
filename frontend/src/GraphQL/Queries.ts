import { gql } from '@apollo/client'

export const GET_SONGS = gql`
  query($search: String, $page: Int) {
    getSongs(search: $search, page: $page) {
      songs{
        name
        artists
        danceability
        year
      }
      page
      totalPages
    }
  }
`;