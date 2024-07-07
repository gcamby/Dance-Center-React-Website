/* React imports */
import React, { useEffect, useState } from 'react';
/* Sub-component imports */
/* Library imports */
import axios from 'axios';
/* JSON imports */




function UserDataDisplay() {
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user-data');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching userData:', error);
        }
        };
    
        fetchUserData();
    }, []);
    
    return(
        <div id="user-data-display">
            <h2>{userData.fname}</h2>
        </div>
    );
}

export default UserDataDisplay;