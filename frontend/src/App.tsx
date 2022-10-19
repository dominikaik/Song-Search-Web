import { createTheme } from '@mui/material/styles';
import React from 'react';
import './App.css';
import FrontPage from './Components/FrontPage'

export const pageTheme = createTheme({
  palette: {
    primary: {
      main: "#136385", 
    },
    secondary: {
      light: "#7aabd6", 
      main: "#2774b6", 
      contrastText: "white", 
    }   
  }
})

function App() {
  return (
    <div className="App"
    style={{color: pageTheme.palette.primary.main}}>
      <FrontPage />
    </div>
  );
}

export default App;
