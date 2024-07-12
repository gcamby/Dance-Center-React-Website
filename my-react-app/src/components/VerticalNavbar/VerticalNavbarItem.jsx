/* React imports */
import React from "react";
import { Link } from 'react-router-dom';
/* Sub-component imports */
/* Library imports */
/* JSON imports */




function VerticalNavbarItem(props) {
    return(
        <button onClick={props.clickFunction}>{props.label}</button>
    );
}

export default VerticalNavbarItem;