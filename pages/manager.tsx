import a from "../styles/Appointment.module.css";
import { useEffect, useRef, useState } from "react";
import Cal from "../components/calendar";
import Current from "../components/current";
import Image from "next/image";
import clock from "../public/clock.png";
import add from "../public/add.png";
import available from "../public/available.png";
import unavailable from "../public/unavailable.png";
import active from "../public/click.png";
import Cookies from 'js-cookie';

type appointment = {
    date: string,
    slot:string,
    patient:string,
    for:string,
    additional:string
}

const Manager = () => {
    // Set the start time and end time
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0);

    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0);

    const time_slots:string[] = ["9:00"];

    for (var time = startTime; time < endTime; time.setMinutes(time.getMinutes() + 30)) {
        time_slots.push(time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',hour12: false}))
    }
    
    const [selected_date, setDate] = useState<Date>(new Date());
    const [selected_slot, setSelectedSlot] = useState<string>("9:00");
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
            date:"temp",
            slot:"temp",
            patient:"temp",
            for:"temp",
            additional:"temp"
        }
    ]);
    const [expand,setExpand] = useState<boolean>(false);
    const [feedback, setFeedBack] = useState<string>("");

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
        setDaysAppointents([
            {
                date:"temp",
                slot:"temp",
                patient:"temp",
                for:"temp",
                additional:"temp"
            }
        ])
        const fetchData = async () => {
          const response = await fetch(`http://localhost:3000/api/retrieve?date=${selected_date.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"})}`);
          const data = await response.json();
          if(response.status !== 200){
            window.location.href = "/";
          }
          setDaysAppointents(data);
          console.log(data,"here")
        };
        fetchData();
        if(expand){setExpand(false)}
    }, [selected_date]);

    const handle_appointment = (e:any) => {
        selected_date.setHours(e.target.value?.split(":")[0])
        selected_date.setMinutes(e.target.value?.split(":")[1])
        setSelectedSlot(e.target.value);
        setExpand(false);
        setFeedBack("");
    }

    const handle_add = async () => {
        if(patient.current!.innerText.length > 10 && appoint_for.current!.innerText.length > 5){
            setFeedBack("Adding a new appointment...")
            const res = await fetch("http://localhost:3000/api/add",{
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
            .then(res => {
                console.log("Registered the appointment", res.json());
                if(res.status !== 200){
                    window.location.href = "/";
                }
                else{
                setDaysAppointents([...day_s_appointments, {
                    date: selected_date.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"}),
                    slot:selected_slot,
                    patient:patient.current?.innerText,
                    for:appoint_for.current?.innerText,
                    additional:additional.current?.innerText
                } as Appointment]);
                setFeedBack("Successfully added appointment");
                setTimeout(() => {
                    setFeedBack("");
                }, 1000);
                }
            })
            .catch(error => console.error("Error occurred:", error));
        }
        else{
            alert("Appointment details missing!\nPatient:Min 10 characters!\nAppoint. For: Min 5 characters!")
        }

    }

    const handle_update = async () => {
        setFeedBack("Updating the appointment...")
        const res = await fetch("http://localhost:3000/api/update",{
            method:"PUT",
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
        .then(res => res.json()
        .then(data => {
            console.log(res.status)
            console.log("Updated the appointment", data);
            if(res.status === 401){
                confirm("Session Expired! Please log in...")
                window.location.href = "/"
            }
            else{
                setFeedBack(data.message);
                setTimeout(() => {
                    setFeedBack("");
                }, 1000);
            }

        }))
        .catch(error => console.error("Error occurred:", error));
    }

    const handle_remove = async () => {
        confirm("do you want to remove the appointment?")
        setFeedBack("Removing the appointment...")
        const res = await fetch("http://localhost:3000/api/remove",{
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
        .then(res => res.json()
        .then(data => {
            console.log("Removed the appointment", data);
            if(res.status === 401){
                confirm("Session Expired! Please log in...")
                window.location.href = "/"
            }
            else{
                setFeedBack(data.message);
                setTimeout(() => {
                    setDaysAppointents(
                        day_s_appointments.filter(app => app.slot !== data.slot )
                    );
                    setFeedBack("");
                }, 1000);
            }

        }))
        .catch(error => console.error("Error occurred:", error));
    }

    const handle_logout = async () => {
        const res = await fetch("http://localhost:3000/api/logout",{
            method:"GET",
        }) 
        .then(res => {
            window.location.href = res.url;
        })
        .catch(error => console.error("Error occurred:", error));
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
                <button className={a.console_edit} onClick={handle_logout}>LOG OUT</button>
            </div>
        </div>

        <div className={a.detail}>
        <h1>{selected_date && selected_date.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"})}</h1>
        {
            /* new Date().toDateString() === selected_date.toDateString() &&  */
           day_s_appointments.filter((app:Appointment) => app.slot === selected_slot).length !== 0 
           ?
            <div className={a.detail_appointment}>
                <div id={a.shell}>
                    {feedback.length !== 0 && 
                        <div id={a.temp} 
                            style={{background:feedback.toLocaleLowerCase().includes("success") ? "gold" : "#2f1b41",
                                    color:feedback.toLocaleLowerCase().includes("success") ? "green" : "white",
                                    fontWeight:feedback.toLocaleLowerCase().includes("success") ? "bold" : "normal",
                            }}>{feedback}
                            {!feedback.toLocaleLowerCase().includes("success") && <div id={a.loader}></div>}
                             
                        </div>}
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
                    {
                        selected_date > new Date() || selected_date.toDateString() === new Date().toDateString()  ?
                    <div>
                        <button onClick={handle_update}>Update</button><br />
                        <button onClick={handle_remove}>Remove</button>
                    </div> 
                        : null
                    }  

                </div>
            </div>
            :
            <div className={a.detail_appointment}>
            <div id={a.shell}>
            {feedback.length !== 0 && 
                        <div id={a.temp} 
                            style={{background:feedback.toLocaleLowerCase().includes("success") ? "gold" : "#2f1b41",
                                    color:feedback.toLocaleLowerCase().includes("success") ? "green" : "white",
                                    fontWeight:feedback.toLocaleLowerCase().includes("success") ? "bold" : "normal",
                            }}>{feedback}
                            {!feedback.toLocaleLowerCase().includes("success") && <div id={a.loader}></div>}
                        </div>}
                <div id={a.clock} 
                    onClick={()=> selected_date > new Date() 
                                || selected_date.toDateString() === new Date().toDateString()  ? setExpand(true) : null}>
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
                    <button onClick={handle_add}>Add</button>
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
                    style={{
                    backgroundColor: 
/*                     new Date("1970-01-01T" + time_slots[i] + "Z") < new Date("1970-01-01T" + currentTime + "Z") 
                    &&  new Date("1970-01-01T" + currentTime + "Z") <  new Date("1970-01-01T" + time_slots[i+1] + "Z") 
                    && 
                    selected_date.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"}) === new Date().toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"})
                    ? "#c50851" :  */
                    day_s_appointments.filter((app:Appointment) => app.slot === time_slots[i]).length !== 0 
                    ? "#c50851"
                    :
                    day_s_appointments.filter((app:Appointment) => app.slot === "temp").length === 1 
                    ?
                    "silver"
                    :
                    "#7fa99b",
                    border: time_slots[i] === selected_slot 
                    ? "3px solid #2f1b41" : "1px solid #2f1b41"
                    }}
                    onClick={(e)=>handle_appointment(e)}>
                    {
                        time_slots[i] === selected_slot && <span><Image src={active} alt={"active"}/></span>
                    }
                    {time_slots[i]} {/* {day_s_appointments.length} */}
                    
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