import React from "react";

import NavbarLogo from "./NavbarLogo";
import NavbarLinkContainer from "./NavbarLinkContainer";
import navbarJSON from "../../../json/navbar";

function Navbar() {
  return (
    <nav>
      <div id="navbar-backdrop">
      <div id="navbar-contents">
        <NavbarLogo />
        <NavbarLinkContainer contents={navbarJSON} />
      </div>
      </div>
      
    </nav>

  );
}

export default Navbar;