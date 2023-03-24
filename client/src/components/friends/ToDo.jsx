import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {showFriends, showUsers} from "../../action/FriendAction";
import ShowList from "./showList";


const ToDo = ({text, todo, showList, deleteToDo}) => {

    return (

        <div className="todo">
            <div className="text">{text}
            </div>
            <div className="icons">
                <button className='icon' onClick={deleteToDo}> DELETE</button>
            </div>



        </div>
    )
}

export default ToDo