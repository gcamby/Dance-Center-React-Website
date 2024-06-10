import React from "react";
import NavbarLinkItem from "./NavbarLinkItem";

function createNavbarLinkItem(item, index) {
    return(
        <NavbarLinkItem
        key = {index}
        route = {item.navItemMain.route}
        text={item.navItemMain.title}
        submenu = {item.navItemSubmenu}
        />
    ); 
}

function NavbarLinkContainer(props) {

    return(
        <div id="navbar-link-container">
            {props.contents.navmenu.map(createNavbarLinkItem)}
        </div>
    );
}

export default NavbarLinkContainer;