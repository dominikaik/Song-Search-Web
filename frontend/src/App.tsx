import React from 'react';
import './App.css';
import {useQuery, gql} from '@apollo/client'; 
import Search from './components/UserInput';

function App() {
  return (
    <div className="App">
      <Search />
    </div>
  );
}

export default App;
