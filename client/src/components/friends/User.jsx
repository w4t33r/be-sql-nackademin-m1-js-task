import React from 'react'



const User = ({text, addFriends}) => {
    return (

        <div className="user__container">
            <div className="text">{text}</div>
            <div className="user__btn_container">
                <button className='user__btn' onClick={addFriends
                }>Add to friend
                </button>
            </div>
        </div>
    )
}

export default User