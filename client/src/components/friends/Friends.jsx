import React, {useEffect, useState} from 'react';
import FriendDelete from "./FriendDelete";
import "./friendsStyles.css"
import {showFriends, deleteFriends, showFriendsList} from "../../action/FriendAction";
import {useSelector} from "react-redux";



const Friends = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const [toDo, setToDo] = useState([])
    const [list, setList] = useState([])


    useEffect(() => {
        showFriends(setToDo)
    }, [])


    return (
        <div className="App">
            <div className="wrapper">
                <div className="friend__list">
                    <h1>Your Friends!</h1>


                    {isAuth && toDo.map((item) =>
                        <FriendDelete
                            key={item.id}
                            text={item.username}
                            showList={() => showFriendsList(item.username, setToDo)}
                            todo={item.todo}
                            deleteToDo={() => deleteFriends(item.id, setToDo)}/>)}

                </div>
            </div>

        </div>

    );
};

export default Friends;