import React from 'react'



const ToDo = ({text, updateMode, deleteToDo}) => {

    return (
        <div className="todo">
            <div className="text">{text}</div>
            <div className="icons">
                <button className='icon' onClick={updateMode}> UPDATE</button>
                <button className='icon' onClick={deleteToDo}> DELETE</button>
            </div>
        </div>
    )
}

export default ToDo