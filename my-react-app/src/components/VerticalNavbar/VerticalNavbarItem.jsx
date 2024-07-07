/* React imports */
import React from "react";
import { Link } from 'react-router-dom';
/* Sub-component imports */
/* Library imports */
/* JSON imports */




function VerticalNavbarItem(props) {
    return(
        <Link to={props.route} className="navbar-link-item-main">{props.text}</Link>
    );
}

export default VerticalNavbarItem;