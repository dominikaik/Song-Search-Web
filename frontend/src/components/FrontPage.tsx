import { useEffect, useState } from "react";
import { useReactiveVar } from '@apollo/client';
import { MenuItem, Select, InputLabel, FormControl, TextField, Button, Box, Grid, Typography, Pagination} from '@mui/material';
import { SortBy, SortTypes } from "../enums/order";
import SongList from "./SongList";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';

const FrontPage = () => {
  const [search, setSearch] = useState<string>();
  const [sort, setSort] = useState<SortTypes>(SortTypes.desc);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.year)
  const page = useReactiveVar(songCurrentPage);
  const totalPages = useReactiveVar(songTotalPages);
  const inputs = useReactiveVar(songQueryVars);


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    songQueryVars({...inputs, page: value})
    // Close open info on page change
    openSongTab(-1)
  };

  useEffect(() => {
    //Using reactive variables in apollo to refetch with new queries if sort order or parameter is changed.
    songQueryVars({page: 1, search: inputs.search, orderBy: {[sortBy]: sort}})
    // Close open info when filtering
    openSongTab(-1)
  }, [sort, sortBy])
  
  
    return (
      <>
      <Typography sx={{color:"textColor"}} variant="h3">Spotify explorer</Typography>
        <Box sx={{ mt: "20px", mb: "10px", mx: "30px",  minWidth:200}}>
            <TextField sx={{ width: "60%", borderRadius: "5px", backgroundColor: "searchBar"}} 
                id="search-text-field" 
                color="searchBorder"
                placeholder="Search..."
                size="small" 
                onChange={(e) => {setSearch(e.target.value)
                }} value={search}
                />              
            <Button color="buttonColor" variant="contained" sx={{ml: "10px"}} onClick={() => {songQueryVars({search: search, page: 1}); openSongTab(-1)}} > 
                Search
            </Button>
            </Box>
            <Box>
            <FormControl sx={{ ml: "10px", minWidth: 120 }}>
                <InputLabel id="dropdown-menu" size='small'>Sort by</InputLabel>
                <Select sx={{backgroundColor: "searchBar",}}
                    labelId="dropdown-menu"
                    id="select-search-filter"
                    label="Filter"
                    size='small'
                    variant="outlined"
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
                <Select sx={{backgroundColor: "searchBar",}}
                    labelId="dropdown-menu"
                    id="select-ascending-descending"
                    label="Filter"
                    size='small'
                    variant="outlined"
                    defaultValue={"desc"}
                >
                    <MenuItem value="asc" onClick={() => setSort(SortTypes.asc)}>↑ Ascending</MenuItem>
                    <MenuItem value="desc" onClick={() => setSort(SortTypes.desc)}>↓ Descending</MenuItem>
                </Select>
            </FormControl>
        </Box>

    <SongList/>
      
    <Grid 
    container 
    display="flex"
    direction="column"
    alignItems="center" 
    justifyContent="center">
      <Pagination 
      sx={{mb: "10px"}}
      variant="outlined"
      color="primary"
      count={totalPages} 
      page={page}
      onChange={handlePageChange} 
      />
        </Grid>
      </>
    )
  }
  
export default FrontPage;  
 

