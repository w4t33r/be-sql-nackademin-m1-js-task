import React, {useEffect, useState} from 'react';
import User from "./User"
import {getFriends, showUsers} from "../../action/FriendAction";
import {useSelector} from "react-redux";
import "./usersStyles.css"



const Users = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const [user, setUser] = useState([])


    useEffect(() => {
        showUsers(setUser)
    }, [])

    return (
        <div className="Users">
            <div className="user__wrapper">
                <div className="user__list">
                    <h1>Users List</h1>
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