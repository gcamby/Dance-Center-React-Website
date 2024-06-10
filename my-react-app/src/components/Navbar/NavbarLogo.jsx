import React from "react";
import { Link } from 'react-router-dom';

function NavbarLogo() {
    return(
    <div id="navbar-logo-container">
        <Link to="/"><h1>ROGERS DANCE CENTER</h1></Link>   
    </div>
    );
}

export default NavbarLogo