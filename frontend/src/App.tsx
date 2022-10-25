import { useState, useMemo, createContext } from "react";
import "./App.css";
import FrontPage from "./components/FrontPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { PaletteMode, IconButton, Button } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";

export const ColorModeContext = createContext({ switchMode: () => {} });

declare module "@mui/material/styles/createPalette" { //Find the source for this and add in comment 
  interface Palette {
    custom: { main: string };
    buttonColor: {main: string };
    tableRow: string;
    searchBar: string;
  }
  interface PaletteOptions {
    custom: { main: string };
    buttonColor: {main: string };
    tableRow: string;
    searchBar: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    buttonColor: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    searchBar: true;
  }
}

const changeTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          custom: { 
            main: "#84A98C" 
          },
          divider: "#354F52",
          background: {
            default: "#84A98C" 
          },
          text: {
            custom: { main: "black" },
            secondary: grey[900],
          },
          IconButton: {
            custom: {main: "pink"}
          },
          buttonColor: {
            main: "#CAD2C5"
          },
          tableRow: "#CAD2C5",
          searchBar: "white",
        }
      : {
          // Dark mode palette
          custom: { 
            main: "#2F3E46" 
          },
          divider: grey[200],
          background: {
            default: "#354F52",
          },
          text: {
            custom: { main: "white" },
            secondary: grey[500],
          },
          buttonColor: {
            main: "#354F52"
          },
          tableRow: "#354F52",
          searchBar: "black",
        }),
  },
});

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      switchMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(changeTheme(mode)), [mode]);

  return (
    <div className="App">
      <IconButton onClick={colorMode.switchMode} color="inherit" >
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      {/* <Button variant="contained" >
                    Search
                </Button> */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FrontPage />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
