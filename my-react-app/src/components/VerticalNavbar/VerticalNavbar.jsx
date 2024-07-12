/* React imports */
import React from "react";
import { useNavigate } from 'react-router-dom';
/* Sub-component imports */
import VerticalNavbarItem from "./VerticalNavbarItem";
/* Library imports */
import axios, { Axios } from "axios";
/* JSON imports */
import VerticalNavbarItems from "../../../json/vertical_navbar.json";



function VerticalNavbar(props) {

    const navigate = useNavigate();

    const logout = async (event) => {
        
        event.preventDefault();
        try{
            const response = await axios.post('/api/logout');
            props.setUser(null);
            navigate(response.data.nav);
        } catch(err) {
            console.err(err);
        }
    }

    return(
        <div id="vertical-navbar">
            <VerticalNavbarItem label="Edit Profile" />
            <VerticalNavbarItem label="Messages"/>
            <VerticalNavbarItem label="Manage Classes"/>
            <VerticalNavbarItem label="Logout" clickFunction={logout}/>
        </div>
    );
}

export default VerticalNavbar;