import Navbar from "./Navbar";
import Main from "./Main"
import './app.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Registration from "./auth/Registration";
import Login from "./auth/login";
import {auth} from "../action/user";
import {useDispatch, useSelector} from "react-redux";

import Users from "./friends/Users";
import Friends from "./friends/Friends";


function App() {

const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(auth())
        }
    }, [])

    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <BrowserRouter>
            <div className='App'>
                <Navbar/>
                <div className="wrap">
                    {!isAuth && <Routes>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                    }
                    {isAuth && <Routes>
                        <Route path="/getList" element={<Main/>}/>
                        <Route path="/friend/id" element={<Friends/>}/>
                        <Route path="/friend/users" element={<Users/>}/>
                    </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
