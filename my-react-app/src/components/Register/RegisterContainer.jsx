/* React imports */
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
/* Sub-component imports */
import InputField from "../InputField";
/* Library imports */
import axios from "axios";
/* JSON imports */

function RegisterContainer() {

    const [registerInfo, setRegisterInfo] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {

        const {name, value} = event.target; //destructure

        setRegisterInfo(prevValue => {
            if(name === "fName"){
                return{
                    fName: value,
                    lName: prevValue.lName,
                    email: prevValue.email,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                };
            } else if(name === "lName") {
                return{
                    fName: prevValue.fName,
                    lName: value,
                    email: prevValue.email,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                };
            } else if(name === "email") {
                return{
                    fName: prevValue.fName,
                    lName: prevValue.lName,
                    email: value,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                };
            } else if(name === "password"){
                return{
                    fName: prevValue.fName,
                    lName: prevValue.lName,
                    email: prevValue.email,
                    password: value,
                    confirmPassword: prevValue.confirmPassword
                };
            } else if(name === "confirmPassword"){
                return{
                    fName: prevValue.fName,
                    lName: prevValue.lName,
                    email: prevValue.email,
                    password: prevValue.password,
                    confirmPassword: value
                };
            }
        })

    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Example: Send the input value to the server
        try {
            const response = await axios.post('/api/register',{ registerInfo });
            console.log(response);
            if (response.statusText!=="OK") {
                setMessage("Network response was not ok")
                throw new Error('Network response was not ok');
            } else {

            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return(
        <div id="register-container">
        <div className="form-header"><h2>Register</h2></div>
        <form onSubmit={handleSubmit}>
            <InputField type="text" name="fName" dataLabel="First Name" value={registerInfo.fName} onChange={handleChange}/>
            <InputField type="text" name="lName" dataLabel="Last Name" value={registerInfo.lName} onChange={handleChange}/>
            <InputField type="email" name="email" dataLabel="email" value={registerInfo.email} onChange={handleChange}/>
            <InputField type="password" name="password" dataLabel="Password" value={registerInfo.password} onChange={handleChange}/>
            <InputField type="password" name="confirmPassword" dataLabel="Confirm Password" value={registerInfo.confirmPassword} onChange={handleChange}/>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>

    </div>
    );
}

export default RegisterContainer;