import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function Search() {
    return (
        <div>
            <Box sx={{ mt: "20px", minWidth:200 }}>
                <TextField sx={{ width: '50%' }}
                    id="search-box" 
                    variant='outlined' 
                    label="What are you searching for?" 
                    size="small" />
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
                        <MenuItem value="filter1" >filter2</MenuItem>
                        <MenuItem value="filter1" >filter2</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
  }

  export default Search;