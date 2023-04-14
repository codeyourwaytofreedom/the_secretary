import { NextPage } from 'next';
import { useState } from 'react';
import Calendar from 'react-calendar';

interface date {
    date:Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const Cal:NextPage<date> = ({date, setDate}) => {
    return ( 
        <>
        
            <Calendar locale={"en-US"} 
                maxDate={new Date(2024, 0, 1)} 
                minDate={new Date(2023, 0, 1)}
                onClickDay={(date) => {console.log(setDate(date)); console.log(typeof(date.toLocaleDateString("tr-TR")))}}
            />     
        </>    
     );
}
 
export default Cal;