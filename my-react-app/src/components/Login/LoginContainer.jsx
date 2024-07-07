/* React imports */
import React, {useState} from "react";
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
        console.log('Form submitted with input value:');

        // Example: Send the input value to the server
        try {
            const response = await axios.post('/api/login',{ loginInfo });
            console.log(response.statusText);
            if (response.statusText!=="OK") {
                setMessage("Network response was not ok")
                throw new Error('Network response was not ok');
            } else {
                console.log(response.data);
                navigate(response.data.redirect);
                setMessage(response.data.redirect);
                props.setUser(response.data.user);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return(
        <div className="login-container">
            <div><h2>Login</h2></div>
            <form onSubmit={handleSubmit}>
                <InputField type="email" name="email" dataLabel="email" value={loginInfo.email} onChange={handleChange}/>
                <InputField type="password" name="password" dataLabel="password" value={loginInfo.password} onChange={handleChange}/>
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>

        </div>
    );
}

export default LoginContainer;