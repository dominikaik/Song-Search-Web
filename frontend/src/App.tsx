import {useContext, useState, useMemo, createContext} from 'react';
import './App.css';
import FrontPage from './components/FrontPage'
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import { grey} from '@mui/material/colors';
import { PaletteMode, IconButton, Button } from '@mui/material';
import { Brightness4, Brightness7 } from "@mui/icons-material"; 

const ColorModeContext = createContext({ switchMode: () => {} }); 

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    custom: {main: string};
  }
  interface PaletteOptions {
    custom: {main: string};
  }
}

const changeTheme = (mode: PaletteMode) => ({
    palette: {
      mode, 
      ...(mode === 'light' 
      ? {
        //Light mode palette
        custom: {main: "#84A98C"}, 
        divider: "#354F52", 
        text: {
          custom: {main: "black"},  
          secondary: "grey",
        }, 
      } 
      : {
        //Dark mode palette
        custom: {main: "#CAD2C5"}, 
        divider: grey[200], 
        background: {
          default: "#354F52", 
        }, 
        text: {
          custom: {main: "white"}, 
          secondary: grey[500]
        },
      }),
    },
}); 

function App() {
  const [mode, setMode] = useState<PaletteMode>('light'); 
  const colorMode = useMemo( 
    () =>({

      switchMode: () => {
        setMode((prevMode: PaletteMode) => 
        prevMode === 'light' ? 'dark' : 'light',
        ); 
      }, 
  }),
  [],
  ); 

  const theme = useMemo(() => createTheme(changeTheme(mode)), [mode]);

  return (
    <div className="App">
      <IconButton sx={{ ml: 1 }} onClick={colorMode.switchMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Button variant="contained" >
                    Search
                </Button>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <FrontPage />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
