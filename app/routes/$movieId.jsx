
import '../src/App.css';
import HeaderWithMovieDetails from '../src/components/header/HeaderWithMovieDetails.jsx';
import Main from '../src/components/main/Main.jsx';

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
          <HeaderWithMovieDetails
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


export default App;