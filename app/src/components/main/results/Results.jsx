import './Results.css';

import React from "react";
import MovieTile from './MovieTile';

import { useQuery } from 'react-query';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Results(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy'));
  const [filterByGenre, setFilterByGenre] = useState(searchParams.get('genre') || 'all');
  const [query, setQuery] = useState(searchParams.get('query'));
  useEffect(() => {
    console.log("search parameters updated")
    setSortBy(searchParams.get('sortBy'));
    setFilterByGenre(searchParams.get('genre'));
    setQuery(searchParams.get('query'));
  }, [searchParams]); 

  

  if (props.movieList !== undefined) {
    return (
        <div className="results" data-testid="results">
        {props.movieList.data.map(function(movie, i){
        return  <MovieTile movie={props.movieList.data[i]} setSelectedMovieId={props.setSelectedMovieId} key={i} 
        editMovie={props.editMovie} deleteMovie={props.deleteMovie}/>;})
        }
        </div>
    )
    } else {
        return <div>Api connection error</div>;
    }
}

