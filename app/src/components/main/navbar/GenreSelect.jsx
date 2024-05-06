import './GenreSelect.css';

import React from "react";
import { useState } from "react";

export default function GenreSelect(props) {

    const [selected, setSelected] = useState(props.selected);
    const handleClick = genre => {
        props.onSelect(genre);
        setSelected(genre);
      };
return (
    <div className="genre-select" data-testid="genreSelect">
    {props.genreList.map(function(genre, i){
        return  <button  onClick={() => handleClick(genre)} type="submit" key={i} 
        className={genre === selected ? "genre-button selected" : "genre-button"}>
                    {genre}
                </button>;
        })}
    </div>
  )
}
