/* React imports */
import React, {useState} from "react";
/* Sub-component imports */
import InputField from "../InputField";
/* Library imports */
/* JSON imports */

function RegisterContainer() {

    const [registerInfo, setRegisterInfo] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {

        const {name, value} = event.target; //destructure

        setRegisterInfo(prevValue => {
            if(name === "fname"){
                return{
                    fname: value,
                    lname: prevValue.lname,
                    email: prevValue.email,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                };
            } else if(name === "lname") {
                return{
                    fname: prevValue.fname,
                    lname: value,
                    email: prevValue.email,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                };
            } else if(name === "email") {
                return{
                    fname: prevValue.fname,
                    lname: prevValue.lname,
                    email: value,
                    password: prevValue.password,
                    confirmPassword: prevValue.confirmPassword
                };
            } else if(name === "password"){
                return{
                    fname: prevValue.fname,
                    lname: prevValue.lname,
                    email: prevValue.email,
                    password: value,
                    confirmPassword: prevValue.confirmPassword
                };
            } else if(name === "confirmPassword"){
                return{
                    fname: prevValue.fname,
                    lname: prevValue.lname,
                    email: prevValue.email,
                    password: prevValue.password,
                    confirmPassword: value
                };
            }
        })

    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: registerInfo }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const data = await response.json();
                setMessage(data.message);
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return(
        <div className="register-container">
        <div><h2>Register</h2></div>
        <form onSubmit={handleSubmit}>
            <InputField type="text" name="fname" dataLabel="First Name" value={registerInfo.fname} onChange={handleChange}/>
            <InputField type="text" name="lname" dataLabel="Last Name" value={registerInfo.lname} onChange={handleChange}/>
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