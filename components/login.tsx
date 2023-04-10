import l from "../styles/Login.module.css";
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import Animation_3D from "./Canvas";

type clinic = {
    name:string,
    email:string
}
const Login = () => {
    const router = useRouter();
    const [let_in, setLet_in] = useState<boolean>(false);
    const [clicked, setClicked] = useState<number>(0);


    const handle_login = async (e:MouseEvent<HTMLButtonElement>) => {
        setClicked(1);
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
            setClicked(2)
            setTimeout(() => {
                setLet_in(l => !l);
            }, 1000);
            setTimeout(() => {
                router.push("/test")
            }, 2000);
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
                        <button type="submit" onClick={(e)=>handle_login(e)} id={clicked === 1 ? l.animated_line : l.i}>
                            {clicked === 0 ? "Login" : clicked === 1 ?  "Logging in..." : "Successful!"}
                        </button>
                    </div>
                </form>
                <Animation_3D let_in={let_in} setLet_in={setLet_in}/>
            </div>
        </div>
     );
}
 
export default Login;



//"https://the-secretary-codeyourwaytofreedom.vercel.app//api/hello"