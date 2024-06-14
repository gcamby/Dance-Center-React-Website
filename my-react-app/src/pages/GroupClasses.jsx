import React from "react";
import Schedule from "../components/Schedule";
import Navbar from '../components/Navbar/Navbar';

function GroupClasses() {
    return(
        <div>
            <Navbar />
            <div id="schedule-container">
                <Schedule />
            </div>
        </div>



    );
}

export default GroupClasses;