import React from 'react'


const ToDo = ({text, deleteToDo}) => {

    return (
        <div className="Todo">
            <div className="text">{text}
            </div>
            <div className="icons">
                <button className='friend-btn' onClick={deleteToDo}> DELETE</button>
            </div>
        </div>
    )
}

export default ToDo