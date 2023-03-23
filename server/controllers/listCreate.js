const db = require("../db/db")
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, '../db/.env')
});




module.exports.getList = async (req, res) => {
    try {
        console.log(req.headers)
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Bad token'})
        }
        console.log(token)
        const decodedJwt = jwt.decode(token, {completed:true})
        console.log('decoded',decodedJwt, {completed:true})
        req.user = decodedJwt
        const id = decodedJwt.id
        console.log('ID', decodedJwt.id)
        const getList = "SELECT list.id, todo from list, users where fk_user = users.id and users.id =?";
        console.log(id)

        db.execute(getList, [id], (error, result) => {
            if(error) {
                console.log(error)
            } else {
                res.send(result)
            }
        });
    } catch (e) {
        res.send(e)
    }

}





module.exports.createList = (req, res) => {
    try {
        const secretKey = process.env.secret_key
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, secretKey)
        req.user = decode
        // const decodeToken = jwt.decode(token, {complete:true})
        //console.log(decodeToken)
        const id = decode.id;
        const {todo} = req.body;
        const createList = "INSERT INTO list (fk_user, todo) VALUES (? , ?)";
        db.execute(createList, [id, todo], (err, result) => {
            if (err) {
                res.status(401).json({message: 'Auth Error'})
                console.log(err, null)
            } else {
                res.status(200).json({message: 'Created'})
            }
        })
    } catch (e) {
        res.status('Server Error')
    }
}


module.exports.updateList = async (req, res) => {
    try {

        const secretKey = process.env.secret_key
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, secretKey)
        req.user = decode
        // const decodeToken = jwt.decode(token, {complete:true})
        //console.log(decodeToken)
        const {id, todo} = req.body;
        const updateList = "UPDATE list SET todo = ? WHERE id = ?";
        db.execute(updateList, [todo, id], (err, result) => {
            if (err) {
                res.status(401).json({message: 'Auth Error'})
                console.log(err, null)
            } else {
                console.log(todo, id)
                res.status(200).json({message: 'Created'})
            }
        })


    } catch (e) {
        res.status('Server Error')
    }

}


module.exports.deleteList = async (req, res) => {
    try {

        const secretKey = process.env.secret_key
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, secretKey)
        req.user = decode
        const userId = decode.id;
        const {id} = req.body
        const checkSql = 'SELECT fk_user, users.id, users.username, list.todo FROM list, users WHERE list.fk_user = users.id AND list.id =?';
        const deleteList = "DELETE FROM list WHERE id = ?";

        await db.execute(checkSql, [id], async (err, result) => {
            if (err) {
                console.log(err, null)
            }
            if(!result.length) {
                res.send('empty object')
            }
            console.log(result.length)
            const deleteId = id
            if(result.length > 0) {
                const fk = result.map((async data => {
                    console.log('fk_data',data.fk_user)
                    const fKey = data.fk_user
                    if(fKey === userId) {
                        await db.execute(deleteList, [deleteId], (err, result) => {
                            if (err) {
                                res.status(401).json({message: 'DB Error'})
                                console.log(err, null)
                            } else {
                                res.status(200).json({message: 'Deleted'})
                            }
                        })

                    } else {
                        res.status(401).json({message: "Access denied"})
                    }
                }))
            }
        })

    } catch (e) {
        res.status('Server Error')
    }

}




