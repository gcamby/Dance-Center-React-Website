import React, {useState} from "react";
import InputField from "../InputField";
import Button from "../Button";

function LoginContainer() {

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });


    const handleChange = (event) => {

        const {value, type} = event.target; //destructure

        setLoginInfo(prevValue => {
            if(type === "email"){
                return{
                    email : value,
                    password : prevValue.password
                };
            } else if(type === "password") {
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
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: loginInfo }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return(
        <div className="login-container">
            <div><h2>Login</h2></div>
            <form onSubmit={handleSubmit}>
                <InputField type="email" name="email" value={loginInfo.email} onChange={handleChange}/>
                <InputField type="password" name="password" value={loginInfo.password} onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>

        </div>
    );
}

export default LoginContainer;