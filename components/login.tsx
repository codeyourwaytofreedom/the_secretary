import l from "../styles/Login.module.css";
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';

type clinic = {
    name:string,
    email:string
}
const Login = () => {
    const router = useRouter();

    const handle_login = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
        console.log(res.status)
        if(res.status === 200){
            router.push("/test")
        }
    }
    
    return ( 
        <div className={l.login}>
            <div className={l.login_shell}>
                <form>
                    <div className={l.login_shell_line}>
                        <input type="text" />
                    </div>
                    <div className={l.login_shell_line}>
                        <input type="text" />
                    </div>
                    <div className={l.login_shell_line}>
                        <button type="submit" onClick={(e)=>handle_login(e)}>Login</button>
                    </div>
                    
                </form>

            </div>
        </div>
     );
}
 
export default Login;



//"https://the-secretary-codeyourwaytofreedom.vercel.app//api/hello"