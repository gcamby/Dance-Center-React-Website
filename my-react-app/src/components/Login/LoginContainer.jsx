/* React imports */
import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
/* Sub-component imports */
import InputField from "../InputField";
/* Library imports */
import axios from "axios";
/* JSON imports */

function LoginContainer(props) {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {

        const {value, name} = event.target; //destructure
        setLoginInfo(prevValue => {
            if(name === "email"){
                return{
                    email : value, 
                    password : prevValue.password
                };
            } else if(name === "password") {
                return{
                    email : prevValue.email,
                    password : value
                };
            }
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Example: Send the input value to the server
        try {
            const response = await axios.post('/api/login',{ loginInfo });
            if (response.statusText!=="OK") {
                setMessage("Network response was not ok")
                throw new Error('Network response was not ok');
            } else {
                const isAuthenticated = await axios.get('/api/auth/status');
                props.setUser(isAuthenticated.data.user);
                navigate(response.data.nav);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return(
        <div id="login-container">
            <div className="form-header"><h2>Login</h2></div>
            <form onSubmit={handleSubmit}>
                <InputField type="email" name="email" dataLabel="email" value={loginInfo.email} onChange={handleChange}/>
                <InputField type="password" name="password" dataLabel="password" value={loginInfo.password} onChange={handleChange}/>
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
            <p>Don't have an account? Register<Link to="/register"> here</Link></p>
        </div>
    );
}

export default LoginContainer;