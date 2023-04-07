import l from "../styles/Login.module.css";
type clinic = {
    name:string,
    email:string
}
const Login = () => {
    const handle_login = async () => {
        const res = await fetch("http://localhost:3000/api/hello",{
            method: "POST",
            body:JSON.stringify(
                {
                    name:"clinic_06",
                    email:"can.kolej@gmail.com"
                } as clinic)
        });
        const data = await res.json();
        console.log(data)
    }
    
    return ( 
        <div className={l.login}>
            <div>
                <h1>Login page...</h1>
                <button onClick={handle_login}>Login</button>
            </div>
        </div>
        
     );
}
 
export default Login;