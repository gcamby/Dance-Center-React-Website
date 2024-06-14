import React from "react";
import Navbar from "../components/Navbar/Navbar";
import RegisterContainer from "../components/Register/RegisterContainer";

function Register() {
return(
    <div>
    <Navbar />
    <div id='main-container'>
        <RegisterContainer />
    </div>
</div>
);
}

export default Register;