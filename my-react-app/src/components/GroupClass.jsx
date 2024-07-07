/* React imports */
import React from "react";
/* Sub-component imports */
/* Library imports */
/* JSON imports */



function GroupClass(props){
    return(
    <tr className="class-row">
        <td>{props.date}</td>
        <td>{props.time}</td>
        <td>{props.title}</td>
        <td>{props.skillLevel}</td>
        <td>{props.instructor}</td>
        <td>{props.Location}</td>
        <td>{props.deliveryMedium}</td>
    </tr>
    );

}

export default GroupClass