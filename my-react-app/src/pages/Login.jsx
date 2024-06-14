import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LoginContainer from '../components/Login/LoginContainer';
import { Link } from 'react-router-dom';

function Login() {
    return(
        <div>
            <Navbar />
            <div id='main-container'>
                <LoginContainer />
                <p>Don't have an account? Register<Link to="/register"> here</Link></p>
            </div>
        </div>
    );
}

export default Login;