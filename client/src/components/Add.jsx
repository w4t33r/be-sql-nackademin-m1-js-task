import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
    const [book, setBook] = useState({
        todo: "",
    });
    const [error,setError] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/list/save", {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input
                type="text"
                placeholder="Add your todo"
                name="todo"
                onChange={handleChange}
            />
            <button onClick={handleClick}>Add</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Add;