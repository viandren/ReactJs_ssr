
import '../src/App.css';
import HeaderWithMovieDetails from '../src/components/header/HeaderWithMovieDetails.jsx';
import Main from '../src/components/main/Main.jsx';

import React from "react";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from 'react-query';
import { useLoaderData, useParams } from "@remix-run/react";

import axios from 'axios';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import type { LoaderArgs } from "@remix-run/node";

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

  const {movieList, movie} = useLoaderData<typeof loader>();

  return <QueryClientProvider client={queryClient}>
      <div className="app" id="app">
          <HeaderWithMovieDetails
          setSearchByTitle={setSearchByTitle}
          addMovie={addMovie}
          movie={movie}/>
          <Main 
          searchByTitle={searchByTitle}
          editMovie={editMovie}
          deleteMovie={deleteMovie}
          movieList={movieList}/>
      </div>
    </QueryClientProvider>
}

export const loader = async ({ request, params, context }: LoaderArgs) => {
    
  let { searchParams } = new URL(request.url);
    const sortByField = searchParams.get('sortBy') === 'Title' ? 'title' : 'release_date';
    let queryString = 'sortBy=' + sortByField + '&sortOrder=asc&limit=100';
    if (searchParams.get('genre') !== null && searchParams.get('genre') !== 'all') {
        queryString += '&filter=' + searchParams.get('genre');
    }
    if (searchParams.get('query') !== null && searchParams.get('query') !== '') {
        queryString += '&searchBy=title&search=' + searchParams.get('query');
    }
    console.log('query: ' + queryString)
    //const response1 = await axios.get('http://localhost:4000/movies?' + queryString);
    //const response2 = await axios.get('http://localhost:4000/movies/' + params.movieId );
    const [response1, response2] = await Promise.all([
      axios.get('http://localhost:4000/movies?' + queryString),
      axios.get('http://localhost:4000/movies/' + params.movieId ),
    ]);
    const movieList = response1.data;
    const movie = response2.data;
    if (response1.status !== 200) {
      console.log('Error: Network response was not ok');
    }
    return json({
      movieList,
      movie
    });
  };


export default App;