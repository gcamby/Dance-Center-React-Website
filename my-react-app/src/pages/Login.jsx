/* React imports */
import React from 'react';
import { Link } from 'react-router-dom';
/* Sub-component imports */
import LoginContainer from '../components/Login/LoginContainer';
/* Library imports */
/* JSON imports */






function Login(props) {
    return(
        <div>

            <div id='main-container'>
                <LoginContainer setUser={props.setUser}/>
                <p>Don't have an account? Register<Link to="/register"> here</Link></p>
            </div>
        </div>
    );
}

export default Login;