import React from 'react'

const FriendDelete = ({text, showList, todo, deleteToDo}) => {
    const [isShow, setShow] = React.useState(true);
    const handleToggle = () => {
        setShow(!isShow);
    };

    function refreshPage() {
        window.location.reload(false);
    }


    return (
        <div className="Todo">
            <div className="item">
                <h1>{isShow ? <Welcome text={text}/> : null}</h1>
                <button className='friend-btn' onClick={deleteToDo}>DELETE</button>
                <div className="text">
                </div>
                <div className="friends__icons">

                    <div>
                        <button className='friend-btn' onChange={handleToggle} onClick={showList}> SHOW FRIEND TODOLIST
                        </button>
                        {isShow ? <Welcome todo={todo}/> : null}
                    </div>
                    <button className='friend-btn' onChange={handleToggle} onClick={refreshPage}>SHOW FRIEND NAME</button>
                </div>
            </div>
        </div>
    )
}

const Welcome = ({todo, text }) => {
    return (
        <div>{text}
            <div className="text">{todo}</div>
        </div>
    )
}

export default FriendDelete