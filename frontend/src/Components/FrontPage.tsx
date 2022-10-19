import React, { useEffect, useState } from "react";
import { useQuery, gql, ApolloError } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";

const FrontPage = () => {
  const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState<{search?: string, page: number}>({page: 1})

  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: inputs,
  });
  const [songs, setSongs] = useState<any>()

  useEffect(() => {
    if(data){
      setSongs(data.getSongs)
    }
  }, [data])
  
  
  if (!songs) return <>Loading</>;
  if (error) return <>error</>;
    return (
      <div> 
        <>
        <h2>Spotify explorer</h2>
        <ul>
        {songs.songs.map((song: {name: String, year: number}, i: number) =>
        <li key={i}><b>{song.name}</b> released in year {song.year} </li>
        )}
        </ul>
        <button onClick={() => {setInputs({page: Math.abs(inputs.page - 1)})}}>Previous</button>
        Page {songs.page} of {songs.totalPages}
        <button onClick={() => {setInputs({page: Math.abs(inputs.page + 1)})}}>Next</button>
        </>
       
        </div>
    );
  }
  
export default FrontPage; 
 

