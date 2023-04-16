import { NextPage } from "next";
import a from "../styles/Appointment.module.css";

const today = new Date();
const formattedDate = today.toLocaleDateString("tr-TR", {day: "2-digit",month: "2-digit",year: "numeric"});

interface time {
    currentTime:string
}
const Current:NextPage<time> = ({currentTime}) => {
    return ( 
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
     );
}
 
export default Current;