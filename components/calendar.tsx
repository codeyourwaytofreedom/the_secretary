import Calendar from 'react-calendar';

const Cal = () => {
    return ( 
            <Calendar locale={"tr-TR"} maxDate={new Date(2024, 0, 1)} minDate={new Date(2023, 0, 1)}/>         
     );
}
 
export default Cal;