import axios from 'axios'

//const url = "http://localhost:5000/api/list"

const showFriends = async (setToDo) => {
    axios
        .get("http://localhost:5000/api/auth/friend/id", {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(({data}) => {
            if(!data.length) {
            } else {
                setToDo(data)
            }
        })
        .catch((err) => alert(err.response.data.message))
}


const showUsers = async (setToDo) => {

    try {
        axios
            .get("http://localhost:5000/api/auth/friend/users", {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            .then(({data}) => {
                if(!data.length) {
                    console.log(data)
                } else {

                    setToDo(data)
                }
            })
    } catch (e){
        alert(e.response.data.message)
    }
}
//await axios.post(`http://localhost:5000/api/delete`, {_id}, {
//  headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

const getFriends = (id , setToDo) => {

    axios
        .post(`http://localhost:5000/api/auth/friend/users/add`, {id: id, friendId: id}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then((data) => {

            showFriends(setToDo)
            alert('Friend Added')

        })
        .catch((err) => alert(err.response.data.message))

}

const deleteFriends = (id, setToDo) => {

    axios
        .post(`http://localhost:5000/api/auth/friend/delete/id`, {id: id}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then((data) => {
            showFriends(setToDo)
            alert("Deleted")

        })
        .catch((err) => alert(err.response.data.message))

}


const showFriendsList = async (username, setToDo) => {
    axios
        .post("http://localhost:5000/api/auth/friend/showList/id", {username:username},{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(({data}) => {
                setToDo(data)

        })
        .catch((err) => alert(err.response.data.message))
}



export {showFriends, getFriends, deleteFriends, showUsers, showFriendsList}
