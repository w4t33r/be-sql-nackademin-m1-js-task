import React, {useEffect, useState} from 'react';
import ToDo from "./ToDo";
import User from "./User"
import "./showList"
import "./button"
import './main.css'
import axios from "axios";
import {showFriends, deleteFriends, getFriends, showUsers, showFriendsList} from "../../action/FriendAction";
import {useSelector} from "react-redux";
import {deleteToDo} from "../../action/listAction";
import ShowList from "./showList";


const Friends = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const [toDo, setToDo] = useState([])
    const [list, setList] = useState([])
    const [text, setText] = useState("")

    useEffect(() => {
        showFriends(setToDo)
    }, [])


    return (
        <div className="App">

            <div className="container">

                <div className="top">
                    <div
                        className="add"
                        onClick={() => getFriends(text, setText, setToDo)}>
                    </div>

                </div>

                <div className="list">
                    {isAuth && toDo.map((item) =>
                        <ToDo
                            key={item.id}
                            text={item.username}
                            todo={item.todo}
                            deleteToDo={() => deleteFriends(item.id, setToDo)}/>)}
                </div>

            </div>

        </div>

    );
};

export default Friends;