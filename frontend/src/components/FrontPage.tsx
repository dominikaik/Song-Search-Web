import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";
import SongList from "./SongList";
import {MenuItem, Select, InputLabel, FormControl, TextField, Button, Box, Grid, Table, TableCell, TableBody, TableContainer, TableRow, TableHead, Paper, Typography, useTheme} from '@mui/material';
import { InputSharp } from "@mui/icons-material";

const styleTable = {
  p: "10px", 
  width: "65vw", 
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
        <Box sx={{ mt: "20px", mb: "10px", mx: "30px",  minWidth:200}}>
            <TextField sx={{ width: "50%" }}
                id="search-text-field" 
                variant='outlined' 
                label="Search for a song or artist" 
                placeholder="Search..."
                size="small" 
                onChange={(e) => {setSearch(e.target.value)
                }} value={search}
                />              
            <Button variant="contained" sx={{ml: "10px"}} onClick={() => (setInputs({search: search, page: 1}))} > 
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
    <Typography variant="h3">Spotify explorer</Typography>
    <Grid 
    sx={styleTable}
      container
      direction="column"
      alignItems="center" 
      justifyContent="center"
    >
      <TableContainer sx={{mx:"auto"}} component={Paper}>
        <Table aria-label="songtable">
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
    </Box>
        <Button sx={{mr:2}} variant="contained"  onClick={() => {setInputs({...inputs, page: Math.abs(inputs.page - 1)})}}>Previous</Button>
        Page {songs.page} of {songs.totalPages}
        <Button sx={{ml:2}} variant="contained"  onClick={() => {setInputs({...inputs, page: Math.abs(inputs.page + 1)})}}>Next</Button>
      </>
    );
  }
  
export default FrontPage;  
 

