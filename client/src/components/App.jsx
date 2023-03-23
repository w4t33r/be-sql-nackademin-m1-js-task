import Navbar from "./Navbar";
import Main from "./Main"
import './app.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Registration from "./auth/Registration";
import Login from "./auth/login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../action/user";
import Add from './Add'

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()


    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(auth())
        }
    }, [])

    return (
        <BrowserRouter>
            <div className='App'>
                <Navbar/>
                <div className="wrap">
                    <Routes>

                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                            <Route path="/getList" exact element={<Main/>}/>
                            <Route path="/save" exact element={<Add/>}/>
                            <Route path="/delete" exact element={<Main/>}/>
                        </Routes>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
