import React, {useState} from "react";
import './registration.css'
import Input from "../../uttils/Input";
import {registration} from "../../action/user";


const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='registration'>
            <div className="registration__header">Registration</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="registration__btn" onClick={() => registration(email, password)}>log in</button>
        </div>
    );
};

export default Registration;