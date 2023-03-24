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


}

/*
const getAllToDo = async (setToDo) => {
        await axios
        .get("http://localhost:5000/api/auth/getList", {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(({data}) => {
            if(!data.length) {
                console.log(data)
                console.log(localStorage.getItem('token'))
            } else {
                console.log(data)
                setToDo(data)
            }
        })
}

 */
//await axios.post(`http://localhost:5000/api/delete`, {_id}, {
//  headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

const addToDo = (todo, setText, setToDo) => {

    axios
        .post(`http://localhost:5000/api/auth/save`, {todo}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then((data) => {
            setText("")
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))

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
        .catch((err) => alert(id))

}


const deleteToDo = (id, setToDo) => {

    axios
        .post(`http://localhost:5000/api/auth/delete`, {id: id}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then((data) => {
            getAllToDo(setToDo)
        })
        .catch((err) => alert(id))

}


export {getAllToDo, addToDo, updateToDo, deleteToDo}
