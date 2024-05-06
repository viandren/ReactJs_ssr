

import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "./SearchForm";


export default function SearchContainer(props) {

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = query => {
    setSearchParams(searchParams => {
      searchParams.set("query", query);
      return searchParams;
    });
  };

return (<SearchForm placeholderText={"What do you want to watch?"} handleSubmit={handleSubmit} defaultValue={searchParams.get('query')}/>)
}

