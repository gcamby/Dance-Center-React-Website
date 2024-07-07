/* React imports */
import React from "react";
/* Sub-component imports */
import VerticalNavbar from '../components/VerticalNavbar/VerticalNavbar';
import UserDataDisplay from "../components/UserDataDisplay/UserDataDisplay";
/* Library imports */
/* JSON imports */




function Account() {
    return(
        
        <div className="main-container">
            <VerticalNavbar />
            <UserDataDisplay />
        </div>
    );
}

export default Account;