import './SearchForm.css';

import React from "react";
import { useState } from "react";


export default function SearchForm(props) {

  const [query, setQuery] = useState(props.defaultValue || '');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.handleSubmit(query);
  };

return (
    <div className="search-form" data-testid="searchForm">
      <form data-testid="form" onSubmit={handleSubmit}>
        <input placeholder={props.placeholderText} onChange={handleChange} name="searchInput" className="search-input" value={query}/>
        <button onClick={handleSubmit} type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  )
}

