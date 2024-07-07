/* React imports */
import React from "react";
/* Sub-component imports */
/* Library imports */
/* JSON imports */
import axios from "axios";

async function handleClick () {
 try{
    const response = await axios.get('/api/session');
    console.log(response);
 } catch {

 }
}

function Events() {
    return(
        <div id="main-container">
            <button onClick={handleClick}>check session</button>
        </div>
        

    );
}

export default Events;