import { gql } from '@apollo/client'

export const GET_SONGS = gql`
  query($search: String, $page: Int, $pageSize: Int) {
    getSongs(search: $search, page: $page, pageSize: $pageSize) {
      songs{
        _id
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