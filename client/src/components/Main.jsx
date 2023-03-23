import React, {useEffect, useState} from 'react';
import ToDo from "./ToDo";
import './main.css'
import axios from "axios";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "../action/listAction";
import {useSelector} from "react-redux";


const Main = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const [toDo, setToDo] = useState([])
    const [text, setText] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)
    const [toDoId, setToDoId] = useState("")

    useEffect(() => {
        getAllToDo(setToDo)
    }, [])

    const updateMode = (id, text) => {
        setIsUpdating(true)
        setText(text)
        setToDoId(id)
    }
    return (
        <div className="App">

            <div className="container">

                <h1>ToDo App</h1>

                < div className="top">
                    <input
                    type="text"
                    placeholder="Add ToDos..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    />

                    <div
                    className="add"
                    onClick={isUpdating ?
                    () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                    : () => addToDo(text, setText, setToDo)}>
                {isUpdating ? "Update" : "Add"}
                    </div>

                </div>

                <div className="list">

                    {toDo.map((item) => <ToDo
                        key={item.id}
                        text={item.todo}
                        updateMode = {() => updateMode(item.id, item.todo)}
                        deleteToDo = {() => deleteToDo(item.id, setToDo)} />)}

                </div>

            </div>

        </div>
    );
};

export default Main;