/* React imports */
import React from "react";
/* Sub-component imports */
import NavbarLogo from "./NavbarLogo";
import NavbarLinkContainer from "./NavbarLinkContainer";
/* Library imports */
/* JSON imports */
import navbarJSON from "../../../json/navbar";
import navbarLoggedInJSON from "../../../json/navbar_logged_in.json";

function Navbar(props) {
  return (
    <nav>
      <div id="navbar-backdrop">
      <div id="navbar-contents">
        <NavbarLogo />
        <NavbarLinkContainer contents={props.user == null ? navbarJSON : navbarLoggedInJSON}  user={props.user} />
      </div>
      </div>
      
    </nav>

  );
}

export default Navbar;