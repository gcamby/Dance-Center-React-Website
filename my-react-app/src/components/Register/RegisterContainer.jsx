import React from "react";
import InputField from "../InputField";

function RegisterContainer() {
    return(
        <div className="register-container">
        <div><h2>Register</h2></div>
        <form /* onSubmit={handleSubmit} */>
            <InputField type="text" name="First Name" /* value={loginInfo.email} */ /* onChange={handleChange} *//>
            <InputField type="text" name="Last Name" /* value={loginInfo.email} */ /* onChange={handleChange} *//>
            <InputField type="email" name="email" /* value={loginInfo.email} */ /* onChange={handleChange} *//>
            <InputField type="password" name="password"/* value={loginInfo.password} */ /* onChange={handleChange} *//>
            <button type="submit">Register</button>
        </form>

    </div>
    );
}

export default RegisterContainer;