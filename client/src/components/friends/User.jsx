import React from 'react'


const User = ({text, addFriends}) => {
    return (

        <div className="todo">
            <div className="text">{text}</div>
            <div className="icons">
                <button className='icon' onClick={addFriends
                }>Add to friend
                </button>
            </div>
        </div>
    )
}

export default User