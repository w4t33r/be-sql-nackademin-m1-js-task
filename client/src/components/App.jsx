import Navbar from "./Navbar";
import Main from "./Main"
import './app.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Registration from "./auth/Registration";
import Login from "./auth/login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../action/user";


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
                    {!isAuth && <Routes>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                    }
                    {isAuth && <Routes>
                        <Route path="/getList" element={<Main/>}/>
                    </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
