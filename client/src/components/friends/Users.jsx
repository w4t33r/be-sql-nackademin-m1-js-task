import React, {useEffect, useState} from 'react';
import User from "./User"
import './main.css'
import {getFriends, showUsers, showFriendsList} from "../../action/FriendAction";
import {useSelector} from "react-redux";



const Users = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const [user, setUser] = useState([])


    useEffect(() => {
        showUsers(setUser)
    }, [])

    return (
        <div className="App">
            <div className="container">
                <div className="list">
                    {isAuth && user.map((item) =>
                        <User
                            key={item.id}
                            text={item.username}
                            addFriends={() => getFriends(item.id, setUser)}/>)}
                </div>
            </div>

        </div>

    );
};

export  default  Users;