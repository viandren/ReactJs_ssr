
import './DeleteForm.css';

import React from "react";
import FocusTrap from "focus-trap-react";

export default function DeleteForm({ onSubmit}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit()
  }


    return  <div data-testid="deleteForm" id="deleteform">
    <FocusTrap 
    focusTrapOptions={{
      fallbackFocus: '#deleteform',
      clickOutsideDeactivates: true
    }}>
    <form onSubmit={handleSubmit} className='delete-form'>
        <div className='delete-form-title'>
            Are you sure you want to delete this movie?
        </div>
        <div className='delete-form-button'>
            <button className='delete-form-submit-button' type="submit" data-testid="submitButton">confirm</button>
        </div>
    </form>
    </FocusTrap>
    </div>;
}

