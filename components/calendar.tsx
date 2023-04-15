import { NextPage } from 'next';
import { useState } from 'react';
import Calendar from 'react-calendar';

interface date {
    selected_date:Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Cal:NextPage<date> = ({selected_date, setDate}) => {
    return ( 
        <>
        
            <Calendar locale={"en-US"} 
                maxDate={new Date(2024, 0, 1)} 
                minDate={new Date(2023, 0, 1)}
                onClickDay={(date) => {setDate(date); console.log(date.toLocaleString('en-US',{ weekday: 'long' }))}}
                tileDisabled={({date}) => date.toLocaleString('en-US',{ weekday: 'long' }) === "Sunday" } 
            />     
        </>    
     );
}
 
export default Cal;