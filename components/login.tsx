import l from "../styles/Login.module.css";
import { useRouter } from 'next/router';
import { MouseEvent, useRef, useState } from 'react';
import Animation_3D from "./Canvas";

type clinic = {
    name:string,
    password:string
}
const Login = () => {
    const router = useRouter();
    const [let_in, setLet_in] = useState<boolean>(false);
    const [clicked, setClicked] = useState<number>(0);
    const [warning, setWarning] = useState<string>("")
    const user_name = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const regex_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{[\]:/;?><,.\-='"])[A-Za-z0-9!@#$%^&*()_+~`|}{[\]:/;?><,.\-='"]{8,30}$/
    const regex_username = /^[a-zA-Z0-9_]{6,10}$/;

    const handle_login = async (e:MouseEvent<HTMLButtonElement>) => {
        setClicked(1);
        e.preventDefault();
        if(regex_username.test(user_name.current!.value) && regex_password.test(password.current!.value)){
            const res = await fetch("http://localhost:3000/api/login",{
                method: "POST",
                body:JSON.stringify(
                    {
                        name:user_name.current?.value,
                        password: password.current?.value
                    } as clinic)
            });
            const data = await res.json();
            console.log(data)
            if(res.status === 200){
                setClicked(2)
                setTimeout(() => {
                    setLet_in(l => !l);
                }, 1000);
                setTimeout(() => {
                    router.push(data.url)
                }, 2300);
            }
            else{
                console.log(res.status)
                setWarning(data.message)
                setTimeout(() => {
                    setClicked(0);
                }, 300);
            }
        }
        else{
            setWarning("Invalid Credentials");
            setClicked(0)
        }
    }
    
    return ( 
        <div className={l.login}>
            <div className={l.login_shell}>
                <form>
                    <div className={l.login_shell_line}>
                        <input type="text" name="username" ref={user_name}/>
                    </div>
                    <div className={l.login_shell_line}>
                        <input type="password" name="password" ref={password}/>
                    </div>
                    <div className={l.login_shell_line}>
                        <button type="submit" onClick={(e)=>handle_login(e)} id={clicked === 1 ? l.animated_line : l.i}>
                            {clicked === 0 ? "Login" : clicked === 1 ?  "Logging in..." : "Successful!"}
                        </button>
                    </div>
                    <div className={l.login_shell_warning}>{warning}</div>
                </form>
                <Animation_3D let_in={let_in} setLet_in={setLet_in}/>
            </div>
        </div>
     );
}
 
export default Login;



//"https://the-secretary-codeyourwaytofreedom.vercel.app//api/hello"