/* React imports */
import React, {useState} from "react";
/* Sub-component imports */
/* Library imports */
/* JSON imports */




function InputField(props) {
    return(
        <div className="input-field">
            <label htmlFor={props.name}>{props.dataLabel}</label>
            <input type={props.type} id={props.name} name={props.name} placeholder={props.dataLabel} onChange={props.onChange}/>
        </div>
    );
}

export default InputField;