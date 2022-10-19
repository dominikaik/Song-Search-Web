import React, { useEffect, useState } from "react";
import { useQuery, gql, ApolloError } from '@apollo/client';
import pageTheme from '../App'
import { FormControl, List, ListItem } from "@mui/material";

export const styleForms = {  //styles overall form 
    mt: '20px', 
    width: '40vw', 
    ml: '20px'
}

export const styleListItem = {  //styles each list-item 
  color: "pageTheme.palette.primary.main", 
  p: "10px", 
  m: "10px",
  borderRadius: "10px",
  overflow: "hidden", 
}

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
      <div> 
        <FormControl sx={styleForms}>
        <>
        <h2>Spotify explorer</h2>
        <List> 
        {data.getSongs.songs.map((song: {name: String, year: number}, i: number) =>
        <ListItem sx={styleListItem} key={i}><b>{song.name}</b> Released in year {song.year}</ListItem>
        )} 
        </List>
        Page {data.getSongs.page} of {data.getSongs.totalPages}
        </>
        </FormControl>
        </div>
    );
  }
  
export default FrontPage; 
 

