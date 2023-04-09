import l from "../styles/Login.module.css";
import { useRouter } from 'next/router';

type clinic = {
    name:string,
    email:string
}
const Login = () => {
    const router = useRouter();

    const handle_login = async () => {
        const res = await fetch("https://the-secretary-codeyourwaytofreedom.vercel.app/api/hello",{
            method: "POST",
            body:JSON.stringify(
                {
                    name:"clinic_06",
                    email:"can.kolej@gmail.com"
                } as clinic)
        });
        const data = await res.json();
        console.log(data)
        console.log(res.status)
        if(res.status === 200){
            router.push("/test")
        }
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