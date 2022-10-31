import { useEffect, useState } from "react";
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";
import { RATE_SONG } from "../GraphQL/Mutations";
import { Stack, Chip, Rating, Box, Grid, Table, TableCell, TableBody, TableContainer, TableRow, TableHead, Paper, Typography, Collapse, IconButton, LinearProgress } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { getSongsInputs, songsDataType, songsType } from "../types/songData";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';

const styleTable = {
  p: "10px", 
  mx: "auto"
}

const styleEx = {
  p: "10px",  
  mx: "auto", 
  mt: "10px", 
  mb: "10px"
}

function SongList() {

    //const [inputs, setInputs] = useState<getSongsInputs>({page: 1, orderBy: {year: SortTypes.desc}})
    const songVars = useReactiveVar(songQueryVars);
    const open = useReactiveVar(openSongTab);

      // Prepare mutation and query, and do the initial fetch.
    const { loading, error, data } = useQuery<songsDataType, getSongsInputs>(GET_SONGS, {
      variables: songVars,
    });
    const [rateSong] = useMutation(RATE_SONG);
   
  
    useEffect(() => {
      if(data){
        songCurrentPage(data.getSongs.page)
        songTotalPages(data.getSongs.totalPages)
      }
    }, [data])
    
    
  if (loading) return <><LinearProgress sx={{m: 10}} /></>;
  if (error || !data) return <><Box style={{ minHeight: '80vh' }} display="flex" justifyContent={"center"} alignItems={"center"} ><Typography color={"white"} variant="h5">Something went wrong :/<br/>Is the backend server running?</Typography></Box></>;
  return (
    <>
    <Box>
    <Grid item xs={12} md={9}
      sx={styleTable}
      container
      direction="column"
      alignItems="center" 
      justifyContent="center"
    > 
      <TableContainer sx={{mx:"auto", backgroundColor: "tableRow"}} component={Paper}>
        <Table aria-label="songtable">
          <TableHead>
            <TableRow key="song-table-titles">
              <TableCell key="empty"></TableCell>
              <TableCell key="name" >Name</TableCell>
              <TableCell key="main-artist">Main Artist</TableCell>
              <TableCell key="year">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getSongs.songs.map(((song, index: number) => (
              <>
              <TableRow key={song._id}>
                {/* Inspiration from this video: https://www.youtube.com/watch?v=3v2cxwvWh80&t=688s */}
                <TableCell>
                  <IconButton
                    onClick={() => openSongTab(open === index ? -1 : index)}
                  >
                    {open === index ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.artists[0]}</TableCell>
                <TableCell>{song.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{paddingBottom: 0, paddingTop: 0, border: "0px"}}>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <Box sx={{width: "100%"}}> 
                  
                  <Stack sx={{mt: "10px", mb: "10px", mx: "auto"}} direction="row" spacing={4} justifyItems="center" alignItems="center">
                  <Chip label="Info" color="primary"/>
                  <Chip label={"Danceability: "+ (song.danceability * 100).toFixed()+"%"} variant="outlined" />
                  <Chip label={"Popularity: "+ song.popularity + " / 100"} variant="outlined" />
                  <Chip label={Math.floor(song.duration_ms / 60000) +" : "+ ((song.duration_ms % 60000) / 1000).toFixed(0) + " min"} variant="outlined" />
                  {(song.explicit) ? (<Chip label={"Explicit"} variant="outlined" />) : (null)}
                  </Stack>

                  <Stack sx={{styleEx}} direction="row" spacing={4}>
                  <Chip label="Artists" color="primary"/>
                  {song.artists.map((artist: string, i:number) => (
                    <Chip key={i} label={artist} variant="outlined" /> 
                    ))}
                  
                  </Stack>
                  <Box
                    sx={{mt: -6, mb: 3}}
                    flexDirection="column"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end">
                  Rate this song:
                  <Rating
                      name="song-rating"
                      value={song.rating}
                      onChange={(event, newValue) => {rateSong({variables: {id: song._id, rating: newValue}})}}/>
                  </Box> 

                  </Box>
                  </Collapse>
                </TableCell>
                </TableRow>
                </>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
 
    </Grid>
    </Box>
    </>
  )
}

export default SongList