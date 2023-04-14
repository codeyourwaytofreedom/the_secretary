import a from "../styles/Appointment.module.css";
import { useEffect, useState } from "react";
import Cal from "../components/calendar";

const Test = () => {
    const [date, setDate] = useState<Date>();
    const today = new Date();
    const formattedDate = today.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        second:"2-digit",
        hour12: false,
      }));

    useEffect(() => {
    const interval = setInterval(() => {
        const time = new Date().toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
            second:"2-digit",
            hour12: false,
          })
      setCurrentTime(time);
    }, 1000);

        return () => {
        clearInterval(interval);
        };
    }, []);


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
                <Cal date={date} setDate={setDate}/>
            </div>
            <div>
                <button className={a.console_edit}>LOG OUT</button>
            </div>
        </div>
        <div className={a.detail}>
        <h1>{date && date!.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })}</h1>
        </div>
    </div>

        
    </>
        
     );
}
 
export default Test;