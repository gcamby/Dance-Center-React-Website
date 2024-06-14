import React, {useState} from "react";


function InputField(props) {
    return(
        <div>
            <label for={props.name}>{props.name}</label>
            <input type={props.type} id={props.name} name={props.name} placeholder={props.name} onChange={props.onChange}/>
        </div>
    );
}

export default InputField;