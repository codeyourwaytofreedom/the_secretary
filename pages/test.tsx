import { spawn } from "child_process";
import Image from "next/image";
import calendar from "../public/calendar.png";
import a from "../styles/Appointment.module.css";

const Test = () => {
    return ( 
    <>
    <div className={a.console}>
        <div className={a.console_current}>
            <div>
                {
                    [...Array(10)].map((e,i) =>
                    <>
                    <span key={i} id={a.holder}>
                    </span>
                    </>

                )
                }
            </div>
            <div>DATE</div>
            <div>
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
        <div></div>
        <div></div>
    </div>
        
    </>
        
     );
}
 
export default Test;