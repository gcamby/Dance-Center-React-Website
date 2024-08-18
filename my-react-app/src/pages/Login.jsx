/* React imports */
import React from 'react';

/* Sub-component imports */
import LoginContainer from '../components/Login/LoginContainer';
/* Library imports */
/* JSON imports */






function Login(props) {
    return(
        <div>

            <div id='main-container'>
                    <LoginContainer setUser={props.setUser}/>   
            </div>
        </div>
    );
}

export default Login;