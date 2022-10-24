import React from 'react'
import { Box, Grid, Table, TableCell, TableBody, TableContainer, TableRow, TableHead, Paper, Typography, useTheme} from '@mui/material';

const styleTable = {
    p: "10px", 
    width: "65vw", 
    mx: "auto"
  }

function SongList(songs:any) { 
  
    return (
    <>
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
    </>
    )
}

export default SongList; 