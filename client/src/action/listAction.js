import axios from 'axios'

//const url = "http://localhost:5000/api/list"





const getAllToDo = async (setToDo) => {
        await axios
            .get("http://localhost:5000/api/auth/getList", {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            .then(({data}) => {
                console.log(data)
                if(!data.length) {
                    console.log(data)
                } else {
                    setToDo(data)
                }
            })
            .catch((err) => alert(err.response.data))

}


const addToDo = (todo, setText, setToDo) => {

    axios
        .post(`http://localhost:5000/api/auth/save`, {todo}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then((data) => {
            setText("")
            getAllToDo(setToDo)
        })
        .catch((err) => alert(err.response.data))

}

const updateToDo = (id, todo, setToDo, setText, setIsUpdating) => {

    axios
        .put(`http://localhost:5000/api/auth/update`, {todo:todo, id:id}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then((data) => {
            setText("")
            setIsUpdating(false)
            getAllToDo(setToDo)
        })
        .catch((err) => alert(err.response.data))

}


const deleteToDo = (id, setToDo) => {

    axios
        .post(`http://localhost:5000/api/auth/delete`, {id: id}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then((data) => {
            getAllToDo(setToDo)
        })
        .catch((err) => alert(err.response.data))

}


export {getAllToDo, addToDo, updateToDo, deleteToDo}
