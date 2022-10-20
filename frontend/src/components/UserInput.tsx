import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';


function Search() {

    const [search, setSearch] = useState<string>();

    return (
        <div>
            <Box sx={{ mt: "20px", minWidth:200 }}>
                <TextField sx={{ width: '50%' }}
                    id="search-text-field" 
                    variant='outlined' 
                    label="What are you searching for?" 
                    placeholder="Search..."
                    size="small" 
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }} value={search}/>
                <Button variant="contained" >
                    Search
                </Button>

                <FormControl sx={{ ml: "10px", minWidth: 120 }}>
                    <InputLabel id="dropdown-menu" size='small'>Filter</InputLabel>
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
        </div>
    );
  }

  export default Search;