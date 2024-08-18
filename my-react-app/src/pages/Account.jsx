/* React imports */
import React from "react";
/* Sub-component imports */
import VerticalNavbar from '../components/VerticalNavbar/VerticalNavbar';
import UserDataDisplay from "../components/UserDataDisplay/UserDataDisplay";
/* Library imports */
/* JSON imports */




function Account(props) {
    
    
    return(
        
        <div id="main-container">
            <div id="account-container">
            <VerticalNavbar setUser={props.setUser}/>
            <UserDataDisplay />
            </div>
            
        </div>
    );
}

export default Account;