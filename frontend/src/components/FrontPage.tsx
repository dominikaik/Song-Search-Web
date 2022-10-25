import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";
import SongList from "./SongList";
import {MenuItem, Select, InputLabel, FormControl, TextField, Button, Box, Grid, Table, TableCell, TableBody, TableContainer, TableRow, TableHead, Paper, Typography, useTheme} from '@mui/material';
import { ClassNames } from "@emotion/react";

const styleTable = {
  p: "10px", 
  mx: "auto"
}

const styleBtn = {
  p: "10px", 
}

const FrontPage = () => {
  const [inputs, setInputs] = useState<{search?: string, page: number, pageSize?: number}>({page: 1})
  const [songs, setSongs] = useState<any>(); 
  const [search, setSearch] = useState<string>();
  
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
      <>
      <Typography variant="h3">Spotify explorer</Typography>
        <Box sx={{ mt: "20px", mb: "10px", mx: "30px",  minWidth:200}}>
            <TextField sx={{ width: "60%", }}
                id="search-text-field" 
                variant='outlined'
                label="Search for a song or artist" 
                placeholder="Search..."
                size="small" 
                onChange={(e) => {
                    setSearch(e.target.value)
                }} value={search}/>
            <Button color="buttonColor" variant="contained" sx={{ml: "10px"}}>
                Search
            </Button>

            <FormControl sx={{ ml: "10px", minWidth: 120 }}>
                <InputLabel id="dropdown-menu" size='small'>Sort by</InputLabel>
                <Select
                    labelId="dropdown-menu"
                    id="select-search-filter"
                    label="Filter"
                    size='small'
                >
                    <MenuItem value=""> <em>None</em> </MenuItem>
                    <MenuItem value="filter1" >filter1</MenuItem>
                    <MenuItem value="filter2" >filter2</MenuItem>
                    <MenuItem value="filter3" >filter3</MenuItem>
                </Select>
            </FormControl>
        </Box>

        <Box>
    <Grid 
    sx={styleTable}
      container
      direction="column"
      alignItems="center" 
      justifyContent="center"
    >
      <TableContainer sx={{mx:"auto", width:"80%", backgroundColor: "tableRow"}} component={Paper}>
        <Table aria-label="songtable">
          <TableHead >
            <TableRow >
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Year</TableCell>
              <TableCell align="center">Danceability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {songs.songs.map(((song: {name: String, year: number, id: string, danceability: number }, i: number) => (
              <TableRow color="tableRow"
                 
                key={song.id}
              >
                <TableCell align="left">{song.name}</TableCell>
                <TableCell align="center">{song.year}</TableCell>
                <TableCell align="center">{(song.danceability*100).toFixed()}%</TableCell>
              </TableRow>
            )))};
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    </Box>

        <Button sx={{mr:2}} color="buttonColor" variant="contained"  onClick={() => {setInputs({...inputs, page: Math.abs(inputs.page - 1)})}}>Previous</Button>
        Page {songs.page} of {songs.totalPages}
        <Button sx={{ml:2}} color="buttonColor" variant="contained"  onClick={() => {setInputs({...inputs, page: Math.abs(inputs.page + 1)})}}>Next</Button>
      </>
    );
  }
  
export default FrontPage; 
 

