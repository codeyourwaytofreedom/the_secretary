import Calendar from 'react-calendar';
import cc from "../styles/Calendar.module.css";

const Cal = () => {
    return ( 
        <Calendar locale={"tr-TR"} maxDate={new Date(2024, 0, 1)} minDate={new Date(2023, 0, 1)}
        className={cc['react-calendar']} 
        />
     );
}
 
export default Cal;