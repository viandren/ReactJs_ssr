import './Counter.css';

import React from "react";
import { useState } from "react";




function Counter() {
    const [number, setNumber] = useState(15);

    return React.createElement(
        "div",
        {className: "counter", "data-testid": "counter"},
        React.createElement(
            "p",
            {},
            number
          ), 
        React.createElement(
            "button",
            {onClick : () => {setNumber(number+1);}},
            "increase"
          ), 
        React.createElement(
            "button",
            {onClick : () => {setNumber(number-1);}},
            "decrease"
        )
      )
  }


  export default Counter;