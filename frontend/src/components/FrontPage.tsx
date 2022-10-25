import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";
import SongList from "./SongList";
import {MenuItem, Select, InputLabel, FormControl, TextField, Button, Box, Grid, Table, TableCell, TableBody, TableContainer, TableRow, TableHead, Paper, Typography, useTheme, Pagination, PaginationItem} from '@mui/material';

const styleTable = {
  p: "10px", 
  width: "65vw", 
  mx: "auto"
}

const styleBtn = {
  p: "10px", 
  width: "35vw",
  mx: "auto"
}

enum SortBy {
  danceability = 'danceability',
  duration_ms  = 'duration_ms',
  year = 'year',
  popularity = 'popularity'
}

enum SortTypes {
  asc = 'asc',
  desc = 'desc'
}

const FrontPage = () => {
  const [inputs, setInputs] = useState<{search?: string, page: number, pageSize?: number, orderBy?: {[key in SortBy]?: SortTypes}}>({page: 1, orderBy: {year: SortTypes.desc}})
  const [songs, setSongs] = useState<any>(); 
  const [search, setSearch] = useState<string>();
  const [sort, setSort] = useState<SortTypes>(SortTypes.desc);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.year)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setInputs({...inputs, page: value}); 
  };
  
  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: inputs,
  });

  //Using reactive variables in apollo to refetch with new queries if sort order or parameter is changed.
  useEffect(() => {
    setInputs({page: 1, search: inputs.search, orderBy: {[sortBy]: sort}})
  }, [sort, sortBy])
 

  useEffect(() => {
    if(data){
      setSongs(data.getSongs)
    }
  }, [data])
  
  
  if (!songs) return <>Loading</>;
  if (error) return <>error</>;

    return (
      <>
        <Typography color={"white"} variant="h3">Spotify explorer</Typography>
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
            </Box>
            <Box>
            <FormControl sx={{ ml: "10px", minWidth: 120 }}>
                <InputLabel id="dropdown-menu" size='small'>Sort by</InputLabel>
                <Select
                    labelId="dropdown-menu"
                    id="select-search-filter"
                    label="Filter"
                    size='small'
                    defaultValue={"year"}
                >
                    <MenuItem value="year" onClick={() => setSortBy(SortBy.year)} >Year</MenuItem>
                    <MenuItem value="danceability" onClick={() => setSortBy(SortBy.danceability)} >Danceability</MenuItem>
                    <MenuItem value="popularity" onClick={() => setSortBy(SortBy.popularity)} >Popularity</MenuItem>
                    <MenuItem value="duration" onClick={() => setSortBy(SortBy.duration_ms)} >Duration</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ ml: "10px", minWidth: 120 }}>
                <InputLabel id="dropdown-menu" size='small'>Order</InputLabel>
                <Select
                    labelId="dropdown-menu"
                    id="select-ascending-descending"
                    label="Filter"
                    size='small'
                    defaultValue={"desc"}
                >
                    <MenuItem value="asc" onClick={() => setSort(SortTypes.asc)}>↑ Ascending</MenuItem>
                    <MenuItem value="desc" onClick={() => setSort(SortTypes.desc)}>↓ Descending</MenuItem>
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
      <TableContainer sx={{mx:"auto"}} component={Paper}>
        <Table aria-label="songtable">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Danceability</TableCell>
              <TableCell>Popularity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.songs.map(((song: {name: String, year: number, id: string, danceability: number, popularity: number }) => (
              <TableRow
                key={song.id}
              >
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.year}</TableCell>
                <TableCell>{(song.danceability*100).toFixed()}%</TableCell>
                <TableCell>{song.popularity} / 100</TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    </Box>
    <Grid 
    sx={styleBtn}
    direction="row"
    alignItems="center" 
    justifyContent="center">
      <Pagination 
      variant="outlined"
      color="primary"
      count={songs.totalPages} 
      page={songs.page}
      onChange={handlePageChange} 
      />
        {/* <Button sx={{mr:2}} variant="contained"  onClick={() => {setInputs({...inputs, page: Math.abs(inputs.page - 1)})}}>Previous</Button>
        Page {songs.page} of {songs.totalPages}
        <Button sx={{ml:2}} variant="contained"  onClick={() => {setInputs({...inputs, page: Math.abs(inputs.page + 1)})}}>Next</Button> */}
        </Grid>
      </>
    )
  }
  
export default FrontPage;  
 

