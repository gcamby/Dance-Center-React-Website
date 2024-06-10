import React, { useEffect, useState } from 'react';
import GroupClass from './GroupClass';
import axios from 'axios';


function Schedule(props){
    
    const [groupClasses, setGroupClasses] = useState([]);
    
    useEffect(() => {
        const fetchGroupClasses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/group-classes');
            setGroupClasses(response.data);
        } catch (error) {
            console.error('Error fetching groupClasses:', error);
        }
        };
    
        fetchGroupClasses();
    }, []);

    function createGroupClass(groupClass) {
        return(
            <GroupClass
            key = {groupClass.id}
            date= {groupClass.date}
            time= {groupClass.time}
            title = {groupClass.title}
            skillLevel = {groupClass.skill_level}
            instructor = {groupClass.instructor}
            location = {groupClass.location}
            deliveryMedium = {groupClass.delivery_medium}
            />
        );
      }

return(
 <table>
    <thead>
    <tr className='heading-row'>
        <th>Date</th>
        <th>Time</th>
        <th>Title</th>
        <th>Skill Level</th>
        <th>Instructor</th>
        <th>Location</th>
        <th>Delivery Medium</th>
    </tr>
    </thead>
    <tbody>
        {groupClasses.map(createGroupClass)}
    </tbody>
    
 </table>
    
 
);
}

export default Schedule;