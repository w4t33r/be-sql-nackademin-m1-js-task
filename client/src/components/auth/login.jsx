import React, {useState} from "react";
import './login.css'
import Input from "../../uttils/Input";
import {login} from "../../action/user";
import {useDispatch} from "react-redux";



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


    return (
        <div className='login'>
            <div className="login__header">Log In</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="login__btn" onClick={() => dispatch(login(email, password))}>log in</button>
        </div>


    );
};

export default Login;