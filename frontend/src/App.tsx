import { useState, useMemo, createContext } from "react";
import "./App.css";
import FrontPage from "./components/FrontPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { PaletteMode, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";

export const ColorModeContext = createContext({ switchMode: () => {} });

declare module "@mui/material/styles/createPalette" { //Inspired by: https://stackoverflow.com/questions/60424596/cant-customize-color-palette-types-on-material-ui-theme-in-typescript
  interface Palette {
    custom: { main: string };
    buttonColor: {main: string };
    tableRow: string;
    searchBar: string;
    textColor: string;
    searchBorder: string;
  }
  interface PaletteOptions {
    custom: { main: string };
    buttonColor: {main: string };
    tableRow: string;
    searchBar: string;
    textColor: string;
    searchBorder: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    buttonColor: true;
  }
}

declare module'@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    textColor: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    searchBar: true;
    searchBorder: true;
  }
}

const changeTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          custom: { 
            main: "#CAD2C5" 
          },
          divider: "#354F52",
          background: {
            default: "#52796F" 
          },
          IconButton: {
            custom: {main: "pink"}
          },
          buttonColor: {
            main: "#CAD2C5"
          },
          tableRow: "white",
          searchBar: "white",
          textColor: "white",
          searchBorder: "pink",
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
          buttonColor: {
            main: "#2F3E46"
          },
          tableRow: grey[900],
          searchBar: grey[900],
          textColor: "white",
          searchBorder: "pink",
        }),
  },
});

function App() {
  const [mode, setMode] = useState<PaletteMode>("dark");
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
