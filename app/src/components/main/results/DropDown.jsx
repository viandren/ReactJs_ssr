import './DropDown.css';

import React from "react";


export default function DropDown(props) {

return (
    <>     
    <div className="dropdown-container">
        <div className="dropdown-content">
            <span className="close-button" onClick={(e) => {e.stopPropagation();props.closeDropdown(false)}}>x</span>
            <span className="dropdown-option" onClick={(e) => {e.stopPropagation();props.openDialog();props.closeDropdown(false);}}>Edit</span>
            <span className="dropdown-option" onClick={(e) => {e.stopPropagation();props.openDeleteDialog();props.closeDropdown(false);}}>Delete</span>
        </div>
    </div>
    </>
  )
}
