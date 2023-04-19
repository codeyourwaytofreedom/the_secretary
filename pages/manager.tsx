import a from "../styles/Appointment.module.css";
import { useEffect, useRef, useState } from "react";
import Cal from "../components/calendar";
import Current from "../components/current";
import Image from "next/image";
import clock from "../public/clock.png";
import add from "../public/add.png";

type appointment = {
    date: string,
    slot:string,
    patient:string,
    for:string,
    additional:string
}

const Manager = () => {
    console.log(new Date())
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
    const [selected_slot, setSelectedSlot] = useState<string>("9:00")
    const [currentTime, setCurrentTime] = 
                        useState<string>(new Date().toLocaleTimeString("tr-TR",{hour: "2-digit",minute: "2-digit"}));

    const patient = useRef<HTMLSpanElement>(null);
    const appoint_for = useRef<HTMLSpanElement>(null);
    const additional = useRef<HTMLDivElement>(null);
    type Appointment = {
        date: string;
        slot: string;
        patient: string;
        for: string;
        additional: string;
    }

    const [day_s_appointments, setDaysAppointents] = useState<Appointment[]>([
        {
            date: "19.04.2023",
            slot: "16:00",
            patient: "Sophie Turner",
            for: "Examination",
            additional: "Vienna branch"
        }
    ]);
    const [expand,setExpand] = useState<boolean>(false)

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


    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:3000/api/retrieve?date=${selected_date.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"})}`);
          const data = await response.json();
          setDaysAppointents(data);
          console.log(data)
        };
        //fetchData();
    }, [selected_date]);

    const handle_appointment = (e:any) => {
        selected_date.setHours(e.target.value.split(":")[0])
        selected_date.setMinutes(e.target.value.split(":")[1])
        setSelectedSlot(e.target.value);
        setExpand(false)
    }

    const handle_register = async () => {
        const res = await fetch("http://localhost:3000/api/manager",{
            method:"POST",
            body:JSON.stringify(
                {
                    date: selected_date.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"}),
                    slot:selected_slot,
                    patient:patient.current?.innerText,
                    for:appoint_for.current?.innerText,
                    additional:additional.current?.innerText
                } as appointment
            )
        })
        const data = await res.json();   
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
           day_s_appointments.filter((app:Appointment) => app.slot === selected_slot).length !== 0 
           ?
            <div className={a.detail_appointment}>
                <div id={a.shell}>
                    <div id={a.clock}>
                        <Image src={clock} alt={"clock"}/>
                        <p>{selected_slot}</p>
                    </div>
                    <div id={a.info}>
                        <div id={a.line}>
                            <span>Patient:</span><span contentEditable ref={patient}>
                                {day_s_appointments.filter((app:Appointment) => app.slot === selected_slot)[0].patient}
                            </span>
                        </div>
                        <div id={a.line}>
                            <span>Appoint. for:</span><span contentEditable ref={appoint_for}>
                            {day_s_appointments.filter((app:Appointment) => app.slot === selected_slot)[0].for}
                            </span>
                        </div>
                        <div id={a.line}>
                            <span>Additional notes:</span>
                        </div>
                        <div contentEditable id={a.additional} ref={additional}>
                        {day_s_appointments.filter((app:Appointment) => app.slot === selected_slot)[0].additional}
                        </div>
                    </div>  
                    <div>
                        <button onClick={handle_register}>Update Appointment</button><br />
                        <button onClick={handle_register}>Remove Appointment</button>
                    </div>
                </div>
            </div>
            :
            <div className={a.detail_appointment}>
            <div id={a.shell}>
                <div id={a.clock} onClick={()=> setExpand(true)}>
                    <Image src={add} alt={"add"}/>
                    <p>{selected_slot}</p>
                </div>
            {
                expand &&
                <>
                <div id={a.info}>
                    <div id={a.line}>
                        <span>Patient:</span><span contentEditable ref={patient}></span>
                    </div>
                    <div id={a.line}>
                        <span>Appoint. for:</span><span contentEditable ref={appoint_for}></span>
                    </div>
                    <div id={a.line}>
                        <span>Additional notes:</span>
                    </div>
                    <div contentEditable id={a.additional} ref={additional}></div>
                </div>  
                <div>
                    <button onClick={handle_register}>Add Appointment</button>
                </div>
                </>
            }
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
                    ? "#c50851" : "rgb(222, 219, 219)",
                    border: time_slots[i] === selected_slot 
                    ? "2px solid #c50851" : "1px solid #2f1b41"
                    }}
                    onClick={(e)=>handle_appointment(e)}>
                    {time_slots[i]} {day_s_appointments.length}
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