import React, { useEffect, useState } from "react";
import { useQuery, gql, ApolloError } from '@apollo/client';

const FrontPage = () => {

const GET_SONGS = gql`
  query {
    getSongs{
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
  const { loading, error, data } = useQuery(GET_SONGS);
  console.log(data)
  
  if (loading) return <>Loading</>;
  if (error) return <>error</>;
    return (
        <>
        <h2>Spotify explorer</h2>
        <ul>
        {data.getSongs.songs.map((song: {name: String, year: number}, i: number) =>
        <li key={i}><b>{song.name}</b> released in year {song.year} </li>
        )}
        </ul>
        Page {data.getSongs.page} of {data.getSongs.totalPages}
        </>
    );
  }
  
export default FrontPage; 
 

