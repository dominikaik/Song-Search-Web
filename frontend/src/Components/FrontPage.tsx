import React, { useEffect, useState } from "react";
import { useQuery, gql, ApolloError } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";
import Search from "./UserInput";
import { Button, List, ListItem, Box, Grid, Table, TableCell, TableBody, TableContainer, TableRow, TableHead, Paper} from '@mui/material';


const styleList = {
  p: "10px", 
  width: "40vh"
}

const FrontPage = () => {
  const [inputs, setInputs] = useState<{search?: string, page: number, pageSize?: number}>({page: 1})
  const [songs, setSongs] = useState<any>(); 

  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: inputs,
  });
 

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
        <Search />
        {/* <List>
        {songs.songs.map((song: {name: String, year: number}, i: number) =>
        <ListItem key={i}><b>{song.name}</b> released in year {song.year} </ListItem>
        )}
        </List> */}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <TableContainer sx={{m:"auto"}} component={Paper}>
            <Table sx={{ minWidth: 200, maxWidth: 700 }} aria-label="song table" >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Danceability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songs.songs.map(((song: {name: String, year: number, id: string, danceability: number }, i: number) => (
                  <TableRow
                    key={song.id}
                  >
                    <TableCell>{song.name}</TableCell>
                    <TableCell>{song.year}</TableCell>
                    <TableCell>{(song.danceability*100).toFixed()}%</TableCell>
                  </TableRow>
                )))};
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center">
        <Button sx={{mr:2}} variant="contained" onClick={() => {setInputs({...inputs, page: Math.abs(inputs.page - 1)})}}>Previous</Button>
        Page {songs.page} of {songs.totalPages}
        <Button sx={{ml:2}} variant="contained" onClick={() => {setInputs({...inputs, page: Math.abs(inputs.page + 1)})}}>Next</Button>
        </Grid>
        </>
      </div> 
    );
  }
  
export default FrontPage; 
 

