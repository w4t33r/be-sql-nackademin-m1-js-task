import React from 'react';
import './navbar.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../reducer/userReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__header">Backend_1_todoapp</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login"> login </NavLink></div>}
                {!isAuth && <div className="navbar__reg"><NavLink to="/registration"> registration </NavLink></div>}
                {isAuth && <div className="navbar__login"><NavLink to="/getList"> Show Todo list </NavLink></div>}
                {isAuth && <div className="navbar__login"><NavLink to="/friend/id"> Show Friends </NavLink></div>}
                {isAuth && <div className="navbar__login"><NavLink to="/friend/users/"> users </NavLink></div>}
                {isAuth && <div className="navbar__button" onClick={() => dispatch(logout())}> Exit </div>}
            </div>
        </div>


    );
};

export default Navbar;