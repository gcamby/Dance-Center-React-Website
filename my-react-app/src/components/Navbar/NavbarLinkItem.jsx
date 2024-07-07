/* React imports */
import React, {useState} from "react";
/* Sub-component imports */
import NavbarLinkItemMain from "./NavbarLinkItemMain";
import NavbarLinkItemSubmenu from "./NavbarLinkItemSubmenu";
/* Library imports */
/* JSON imports */

function NavbarLinkItem(props) {
    
    const [subMenuIsVisible, setSubMenuIsVisible] = useState(false);

    function handleMouseEnter() {
        setSubMenuIsVisible(true);
    }

    function handleMouseLeave() {
        setSubMenuIsVisible(false);
    }

    return(
        <div className="navbar-link-item" onMouseLeave={handleMouseLeave}>
        <NavbarLinkItemMain route={props.route} text={props.text}  onMouseEnter={handleMouseEnter} hasSubmenu={props.submenu ? true : false}/>
        {props.submenu && <NavbarLinkItemSubmenu submenu={props.submenu} visible={subMenuIsVisible}/>}
        </div>
    );
}

export default NavbarLinkItem;