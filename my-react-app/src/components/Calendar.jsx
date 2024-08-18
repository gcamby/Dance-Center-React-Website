/* React imports */
import React from "react";
/* Sub-component imports */
import Slot from "./Slot";
/* Library imports */
/* JSON imports */



function Calendar(props) {
    
        const getCurrentWeekDates = () => {
          const currentDate = new Date();
      
          // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
          const dayOfWeek = currentDate.getDay();
      
          // Calculate the difference in days to get the last Sunday and upcoming Saturday
          const sundayDiff = currentDate.getDate() - dayOfWeek;
          const mondayDiff =sundayDiff + 1;
          const tuesdayDiff = sundayDiff + 2;
          const wednesdayDiff = sundayDiff + 3;
          const thursdayDiff = sundayDiff + 4;
          const fridayDiff = sundayDiff + 5;
          const saturdayDiff = sundayDiff + 6;
      
          // Create new date objects for Sunday and Saturday
          const sundayDate = new Date(currentDate.setDate(sundayDiff));
          const mondayDate = new Date(currentDate.setDate(mondayDiff));
          const tuesdayDate = new Date(currentDate.setDate(tuesdayDiff));
          const wednesdayDate = new Date(currentDate.setDate(wednesdayDiff));
          const thursdayDate = new Date(currentDate.setDate(thursdayDiff));
          const fridayDate = new Date(currentDate.setDate(fridayDiff));
          const saturdayDate = new Date(currentDate.setDate(saturdayDiff));
      
          // Format the dates as YYYY-MM-DD
          const formatDate = (date) => date.toISOString().split("T")[0];
      
          return {
            sunday: formatDate(sundayDate),
            monday: formatDate(mondayDate),
            tuesday: formatDate(tuesdayDate),
            wednesday: formatDate(wednesdayDate),
            thursday: formatDate(thursdayDate),
            friday: formatDate(fridayDate),
            saturday: formatDate(saturdayDate),
          };
        };
      
        const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = getCurrentWeekDates();
    
    
    return(
        <div>
<h1>Week of {saturday} - {sunday}</h1>
<div className="calendar">

<div className="calendar-header">Time</div>
<div className="calendar-header">Sun {sunday}</div>
<div className="calendar-header">Mon {monday}</div>
<div className="calendar-header">Tue {tuesday}</div>
<div className="calendar-header">Wed {wednesday}</div>
<div className="calendar-header">Thu {thursday}</div>
<div className="calendar-header">Fri {friday}</div>
<div className="calendar-header">Sat {saturday}</div>

<div className="time-slot">8:00</div>
<Slot />
<Slot />
<Slot />
<Slot />
<Slot />
<Slot />
<Slot />

<div className="time-slot">8:15</div>
<Slot />
<Slot />
<Slot />
<Slot />
<Slot />
<Slot />
<Slot />


</div>
    </div>
        
    );

}

export default Calendar;