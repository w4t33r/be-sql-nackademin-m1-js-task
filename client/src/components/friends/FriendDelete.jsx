import React from 'react'


const FriendDelete = ({text, deleteToDo}) => {

    return (
        <div className="Todo">
            <div className="text">Friend username: {text}
            </div>
            <div className="friends__icons">
                <button className='friend-btn' onClick={deleteToDo}> DELETE</button>
            </div>
        </div>
    )
}

export default FriendDelete