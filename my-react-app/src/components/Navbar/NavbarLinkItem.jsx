import React, {useState} from "react";
import NavbarLinkItemMain from "./NavbarLinkItemMain";
import NavbarLinkItemSubmenu from "./NavbarLinkItemSubmenu";

function NavbarLinkItem(props) {
    
    const [subMenuIsVisible, setSubMenuIsVisible] = useState(false);

    function handleMouseEnter() {
        setSubMenuIsVisible(true);
        console.log(subMenuIsVisible);
    }

    function handleMouseLeave() {
        setSubMenuIsVisible(false);
        console.log(subMenuIsVisible);
    }

    return(
        <div className="navbar-link-item" onMouseLeave={handleMouseLeave}>
        <NavbarLinkItemMain route={props.route} text={props.text}  onMouseEnter={handleMouseEnter} hasSubmenu={props.submenu ? true : false}/>
        {props.submenu && <NavbarLinkItemSubmenu submenu={props.submenu} visible={subMenuIsVisible}/>}
        </div>
    );
}

export default NavbarLinkItem;