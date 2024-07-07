/* React imports */
import React from "react";
/* Sub-component imports */
import VerticalNavbarItem from "./VerticalNavbarItem";
/* Library imports */
/* JSON imports */
import VerticalNavbarItems from "../../../json/vertical_navbar.json";

function createVerticalNavbarItem(item, index) {
    return(
        <VerticalNavbarItem
        key = {index}
        route = {item.navItemMain.route}
        text={item.navItemMain.title}
        />
    ); 
}

function VerticalNavbar() {
    return(
        <div id="vertical-navbar">
            {VerticalNavbarItems.navmenu.map(createVerticalNavbarItem)}
        </div>
    );
}

export default VerticalNavbar;