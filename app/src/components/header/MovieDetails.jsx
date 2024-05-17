
import './MovieDetails.css';

import React from "react";
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function MovieDetails( props ) {


const data = props.movie;
      

return (
    <div className="movie-details" data-testid="movieDetails">
        <img className="details-poster" src={data.poster_path} alt="" />
        <div className="details-box">
            <div className="details-title-row">
                <div className="details-title">{data.title}</div>
                <div className="details-rating">{data.vote_average}</div>
            </div>
            <div className="details-genres">{data.genres.join(', ')}</div>
            <div className="duration-row">
                <div className="details-release-year">{new Date(data.release_date).getFullYear()}</div>
                <div className="details-duration">{getFormattedRuntime(data)}</div>
            </div>
            <div className="details-description">{data.overview}</div>
        </div>
    </div>
  )
}

function getFormattedRuntime(movie) {
    var hours = Math.floor(movie.runtime / 60);          
    var minutes = movie.runtime - hours * 60;
    return hours + 'h ' + minutes + 'min'
}