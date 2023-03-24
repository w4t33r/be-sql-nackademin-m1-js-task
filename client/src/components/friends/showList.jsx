import React from 'react';

const ShowList = ({text}) => {
    return (

        <div className="todo">
            <div className="text">{text}</div>
        </div>
    );
};

export default ShowList;