import React from 'react'


const ToDo = ({text, updateMode, deleteToDo}) => {
    return (
            <div className="Todo">
                <div className="text">{text}</div>
            <div className="icons">
                <button className='update__btn' onClick={updateMode}> UPDATE</button>
                <button className='delete__btn' onClick={deleteToDo}> DELETE</button>
            </div>
        </div>
    )
}

export default ToDo