/* React imports */
import React from "react";
import { Link } from 'react-router-dom';
/* Sub-component imports */
/* Library imports */
/* JSON imports */

function NavbarLinkItemMain(props) {
    return(
        <Link to={props.route} className="navbar-link-item-main" onMouseEnter={props.onMouseEnter}>{props.text}{props.hasSubmenu && " ▼"}</Link>
    );
}

export default NavbarLinkItemMain;