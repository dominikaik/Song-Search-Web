import { gql } from '@apollo/client'

// enum SortBy {
//   danceability,
//   duration_ms,
//   year,
//   popularity
// }

enum Sort {
  asc = 'asc',
  desc = 'desc'
}

type OrderBySelect = {
  year: Sort
  popularity: Sort
  danceability: Sort
  duration_ms: Sort
}

export const GET_SONGS = gql`
  query($search: String, $page: Int, $pageSize: Int, $orderBy: OrderBySelect) {
    getSongs(search: $search, page: $page, pageSize: $pageSize, orderBy: $orderBy) {
      songs{
        _id
        name
        artists
        danceability
        year
        key
        popularity
        rating
      }
      page
      totalPages
    }
  }
`;

export const RATE_SONG = gql`
  mutation($id: ID!, $rating: Int!) {
    rateSong(_id: $id, rating: $rating){
      name
      rating
      _id
    }
  }
`;