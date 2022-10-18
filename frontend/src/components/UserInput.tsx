import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


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
            </Box>
        </div>
    );
  }

  export default Search;