import a from "../styles/Appointment.module.css";
import { useEffect, useState } from "react";
import Cal from "../components/calendar";
import Current from "../components/current";
import Image from "next/image";
import clock from "../public/clock.png";

const Manager = () => {
    // Set the start time and end time
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0);

    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0);

    const time_slots:string[] = [];

    for (var time = startTime; time < endTime; time.setMinutes(time.getMinutes() + 30)) {
        time_slots.push(time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',hour12: false}))
    }
    
    const [selected_date, setDate] = useState<Date>(new Date());
    const [selected_slot, setSelectedSlot] = useState<string>("")
    const [currentTime, setCurrentTime] = 
                        useState<string>(new Date().toLocaleTimeString("tr-TR",{hour: "2-digit",minute: "2-digit"}));

    //display time
    useEffect(() => {
    const interval = setInterval(() => {
        const time = new Date().toLocaleTimeString("tr-TR", {hour: "2-digit",minute: "2-digit",hour12: false,})
        setCurrentTime(time);
    }, 60000);
    return () => {
    clearInterval(interval);
    };
    }, []);

    const handle_appointment = (e:any) => {
        selected_date.setHours(e.target.value.split(":")[0])
        selected_date.setMinutes(e.target.value.split(":")[1])

        console.log(e.target.value)

        setSelectedSlot(e.target.value)
    }

    return ( 
    <>
    <div className={a.double}>
        <div className={a.console}>
            <Current currentTime={currentTime} />
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
            new Date().toDateString() === selected_date.toDateString() && 
            <div className={a.detail_appointment}>
                <div id={a.shell}>
                    <div id={a.clock}>
                        <Image src={clock} alt={"clock"}/>
                        <p>{selected_slot}</p>
                    </div>
                    <div id={a.info}>
                        Hello Deniz
                    </div>
                    
                </div>
            </div>
        }

        <div className={a.detail_schedule}>
            {
                [...Array(16)].map((e,i)=>
                <button suppressHydrationWarning className={a.detail_schedule_each} key={i} value={time_slots[i]} 
                    style={{backgroundColor: new Date("1970-01-01T" + time_slots[i] + "Z") < new Date("1970-01-01T" + currentTime + "Z") 
                    &&  new Date("1970-01-01T" + currentTime + "Z") <  new Date("1970-01-01T" + time_slots[i+1] + "Z") 
                    && 
                    selected_date.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"}) === new Date().toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"})
                    ? "red" : "rgb(222, 219, 219)",
                    border: time_slots[i] === selected_slot ? "2px solid #c50851" : "1px solid #2f1b41"
                    }}
                    onClick={(e)=>handle_appointment(e)}>
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
 
export default Manager;