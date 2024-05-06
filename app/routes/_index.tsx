
import '../src/App.css';
import Header from '../src/components/header/Header.jsx';
import Main from '../src/components/main/Main.jsx';

import React from "react";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from 'react-query';
import { useLoaderData } from "@remix-run/react";

import axios from 'axios';

function App() {

  const queryClient = new QueryClient();


  const [searchByTitle, setSearchByTitle] = useState('');
  

  const addMovie = (movie: string) => {
    console.log('add: ' + movie);
  }

  const editMovie = (movie: string) => {
    console.log('edit: ' + movie);
  }

  const deleteMovie = (movie: string) => {
    console.log('delete: ' + movie);
  }

  const movieListData = useLoaderData<typeof loader>();

  return <QueryClientProvider client={queryClient}>
      <div className="app" id="app">
          <Header 
          setSearchByTitle={setSearchByTitle}
          addMovie={addMovie}/>
          <Main 
          searchByTitle={searchByTitle}
          editMovie={editMovie}
          deleteMovie={deleteMovie}
          movieList={movieListData}/>
      </div>
    </QueryClientProvider>
}

export const loader = async () => {
    
    const sortByField = /*sortBy === 'Title' ? 'title' :*/ 'release_date';
    let queryString = 'sortBy=' + sortByField + '&sortOrder=asc&limit=100';
    /*if (filterByGenre !== null && filterByGenre !== 'all') {
        queryString += '&filter=' + filterByGenre;
    }
    if (query !== null && query !== '') {
        queryString += '&searchBy=title&search=' + query;
    }*/
    console.log('query: ' + queryString)
    const response = await axios.get('http://localhost:4000/movies?' + queryString);
    if (response.status !== 200) {
      console.log('Error: Network response was not ok');
    }
    return response.data;
  };


export default App;