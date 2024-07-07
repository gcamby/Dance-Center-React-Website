/* React imports */
import React from "react";
import { Link } from 'react-router-dom';
/* Sub-component imports */
/* Library imports */
/* JSON imports */

function createNavbarLinkItemSubmenu(item, index) {
    return(
        <Link to={item.route} className="navbar-link-item-submenu-link" key={index}><li key={index}>{item.title}</li></Link>
    );
}

function NavbarLinkItemSubmenu(props) {

    return(
        <ul className="navbar-link-item-submenu" style={{visibility: props.visible ? "visible" : "hidden"}}>
            {props.submenu.map(createNavbarLinkItemSubmenu)}
        </ul>
    );
}

export default NavbarLinkItemSubmenu;