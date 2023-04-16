import a from "../styles/Appointment.module.css";
import { useEffect, useState } from "react";
import Cal from "../components/calendar";

const Test = () => {
    // Set the start time and end time
const startTime = new Date();
startTime.setHours(9, 0, 0, 0);

const endTime = new Date();
endTime.setHours(18, 0, 0, 0);

const time_slots:string[] = [];

for (var time = startTime; time < endTime; time.setMinutes(time.getMinutes() + 30)) {
    console.log(time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
    time_slots.push(time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
}
  
const today = new Date();
const formattedDate = today.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
    });
const [selected_date, setDate] = useState<Date>(today);
const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    }));

    useEffect(() => {
    const interval = setInterval(() => {
        const time = new Date().toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
      setCurrentTime(time);
    }, 60000);

        return () => {
        clearInterval(interval);
        };
    }, []);

    const handle_appointment = (e:any) => {
        console.log(e.currentTarget.value)
    }

    return ( 
    <>
    <div className={a.double}>
        <div className={a.console}>
            <div className={a.console_current}>
                <div className={a.console_current_top}>
                    {
                        [...Array(10)].map((e,i) =>
                        <>
                        <span key={i} id={a.holder}>
                        </span>
                        </>

                    )
                    }
                </div>
                <div className={a.console_current_center}>
                        <div>
                            <div>{formattedDate!}</div>
                            <div suppressHydrationWarning>{currentTime!}</div>
                        </div>
                </div>
                <div className={a.console_current_holes}>
                {
                        [...Array(10)].map((e,i) =>
                        <>
                        <span key={i} id={a.oval}>
                        </span>
                        </>

                    )
                    }
                </div>
            </div>
            <div className={a.console_calendar}>
                <Cal selected_date={selected_date} setDate={setDate}/>
            </div>
            <div>
                <button className={a.console_edit}>LOG OUT</button>
            </div>
        </div>
        <div className={a.detail}>
        <h1>{selected_date && selected_date.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"})}</h1>
        {
            today.toDateString() === selected_date.toDateString() && 
            <div className={a.detail_appointment}>
                Current Appointment details go here...
            </div>
        }

        <div className={a.detail_schedule}>
            {
                [...Array(16)].map((e,i)=>
                <button suppressHydrationWarning className={a.detail_schedule_each} key={i} value={time_slots[i]} onClick={(e)=>handle_appointment(e)}>
                    {time_slots[i]}
                </button>
                )
            }
        </div>
        </div>
    </div>
    </>
        
     );
}
 
export default Test;