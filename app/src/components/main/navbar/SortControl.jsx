import './SortControl.css';

import React from "react";

export default function SortControl(props) {

    const change = event => {
        props.setSortBy(event.target.value);
    }
return (
    <div className="sort-control" data-testid="sortControl">
        <div className="sort-title">Sort by</div>
        <select className="sort-select" onChange={change} data-testid="sortControlSelect" defaultValue={props.defaultValue}>
            {props.sortByOptions.map(function(option, i){
                return <option key={i} value={option} >{option}</option>
            })}
        </select>
    </div>
  )
}
