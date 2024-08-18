/* React imports */
import React, { useEffect, useState } from 'react';
/* Sub-component imports */
import ProfilePicture from './ProfilePicture';
/* Library imports */
import axios from 'axios';
/* JSON imports */




function UserDataDisplay() {
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user-data');
            console.log(response.data[0].profile_picture);
            setUserData(response.data[0]);
        } catch (error) {
            console.error('Error fetching userData:', error);
        }
        };
    
        fetchUserData();
    }, []);
    

    return(
        <div id="user-data-display">
        <ProfilePicture source={userData.profile_picture} />
        <form action="/api/upload-single" method="post" enctype="multipart/form-data">
            <input type="file" name="file" required/>
            <button type="submit">Upload</button>
        </form>
        <h2>{userData.fname} {userData.lname}</h2>
        <p>{userData.email}</p>
        <p>{userData.phone}</p>
        </div>
    );
}

export default UserDataDisplay;