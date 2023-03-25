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
        console.log(e)
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
        .catch((err) => alert(`Already your friend`))
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
        .catch((err) => alert(`You cant delete any todos if its not yours`))

}


const showFriendsList = async (username, setToDo) => {
    axios
        .post("http://localhost:5000/api/auth/friend/showList/id", {username:username},{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(({data}) => {
            if(!data.length) {
                alert('Your friend dont have any todo list')
            } else {
                setToDo(data)
            }
        })
        .catch((err)=> alert("You already looking at your friend todo list"))
}



export {showFriends, getFriends, deleteFriends, showUsers, showFriendsList}
