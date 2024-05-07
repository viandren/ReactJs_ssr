import './Main.css';

import React from "react";
import { useState } from "react";

import Navbar from './navbar/Navbar.jsx';
import Results from './results/Results.jsx';

import { useSearchParams } from "@remix-run/react";

export default function Main(props) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'all');
  const [selectedSortBy, setSelectedSortBy] = useState(searchParams.get('sortBy') || 'Release Date');

  const setFilterByGenre = (genre) => {
    console.log("genre selected: " + genre);
    setSelectedGenre(genre);
    setSearchParams(searchParams => {
      searchParams.set("genre", genre);
      return searchParams;
    });
  }

  const setSortBy = (sortBy) => {
    setSelectedSortBy(sortBy);
    setSearchParams(searchParams => {
      searchParams.set("sortBy", sortBy);
      return searchParams;
    });
  }

    return  <div className="main">
    <Navbar filterByGenre={setFilterByGenre}
            selectedGenre={selectedGenre}
            setSortBy={setSortBy}
            selectedSortBy={selectedSortBy}/>
    <Results setSelectedMovieId={props.setSelectedMovieId}
            searchByTitle={props.searchByTitle}
          editMovie={props.editMovie}
          deleteMovie={props.deleteMovie}
          movieList={props.movieList}/>
    </div>;
}