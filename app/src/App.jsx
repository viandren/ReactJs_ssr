
import './App.css';
import Header from './components/header/Header.jsx';
import Main from './components/main/Main.jsx';

import React from "react";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

  const queryClient = new QueryClient();


  const [searchByTitle, setSearchByTitle] = useState('');
  

  const addMovie = (movie) => {
    console.log('add: ' + movie);
  }

  const editMovie = (movie) => {
    console.log('edit: ' + movie);
  }

  const deleteMovie = (movie) => {
    console.log('delete: ' + movie);
  }


  return <QueryClientProvider client={queryClient}>
      <div className="app" id="app">
          <Header 
          setSearchByTitle={setSearchByTitle}
          addMovie={addMovie}/>
          <Main 
          searchByTitle={searchByTitle}
          editMovie={editMovie}
          deleteMovie={deleteMovie}/>
      </div>
    </QueryClientProvider>
}


export default App;
