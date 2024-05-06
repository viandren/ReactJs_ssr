import './Navbar.css';

import React from "react";

import GenreSelect from './GenreSelect.jsx';
import SortControl from './SortControl.jsx';

export default function Navbar(props) {


    return   <div className="navbar">
        <GenreSelect 
      genreList={["all", "horror","comedy","fantasy","romance","adventure", "action", "drama"]}
      selected={props.selectedGenre}
      onSelect={(genre) => {props.filterByGenre(genre);}} />
      <SortControl sortByOptions={["Release Date", "Title"]} setSortBy={props.setSortBy} defaultValue={props.selectedSortBy}/>
      </div>;
}