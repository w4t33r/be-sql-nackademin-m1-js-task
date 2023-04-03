const db = require("../db/db")
const jwt = require("jsonwebtoken");
const path = require("path");
const {listCreateSchema, updateListSchema, friendDeleteSchema} = require("../validation/validation");
require("dotenv").config({
    path: path.resolve(__dirname, '../db/.env')
});


module.exports.getList = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Bad token'})
        }

        const decodedJwt = jwt.decode(token, {completed: true})

        req.user = decodedJwt
        const id = decodedJwt.id

        const getList = "SELECT list.id, todo from list, users where fk_user = users.id and users.id =?";


        db.execute(getList, [id], (error, result) => {
            if (error) {
                res.status(500).json({message: 'Internal server error'})
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


        const validation = listCreateSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        }
        const {todo} = validation.value

        if (todo === undefined) {
            res.status(400).json({message: 'Bad Request'})
        }


        const secretKey = process.env.secret_key
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, secretKey)
        req.user = decode
        // const decodeToken = jwt.decode(token, {complete:true})
        //console.log(decodeToken)
        const id = decode.id;

        const createList = "INSERT INTO list (fk_user, todo) VALUES (? , ?)";
        db.execute(createList, [id, todo], (err, result) => {
            if (err) {
                res.status(500).json({message: 'Internal server error'})
            } else {
                res.status(201).json({message: 'Created'})
            }
        })
    } catch (e) {
        res.status('Server Error')
    }
}


module.exports.updateList = async (req, res) => {
    try {

        const validation = updateListSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        }
        const {id, todo} = validation.value

        if (todo === undefined || id === undefined) {
            res.status(400).json({message: 'Bad Request'})
        }
        const updateList = "UPDATE list SET todo = ? WHERE id = ?";
        db.execute(updateList, [todo, id], (err, result) => {
            if (err) {
                res.status(500).json({message: 'Internal server error'})
            } else {
                res.status(201).json({message: 'Created'})
            }
        })


    } catch (e) {
        res.status('Server Error')
    }

}


module.exports.deleteList = async (req, res) => {
    try {

        const validation = friendDeleteSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        }
        const {id} = validation.value

        if (id === undefined) {
            res.status(400).json({message: 'Bad Request'})
        }

        const secretKey = process.env.secret_key
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, secretKey)
        req.user = decode
        const userId = decode.id;


        const checkSql = 'SELECT fk_user, users.id, users.username, list.todo FROM list, users WHERE list.fk_user = users.id AND list.id =?';
        const deleteList = "DELETE FROM list WHERE id = ?";

        await db.execute(checkSql, [id], async (err, result) => {
            if (err) {
                res.status(500).json({message: 'Internal server error'})
            }
            if (!result.length) {
                res.status(401).json({message: 'Access Denied, you cant delete todos if its not yours.'})
            } else {
                const deleteId = id
                if (result.length > 0) {
                    result.map((async data => {
                        const fKey = data.fk_user
                        if (fKey === userId) {
                            await db.execute(deleteList, [deleteId], (err, result) => {
                                if (err) {
                                    res.status(500).json({message: 'Internal server error'})
                                } else {
                                    res.status(200).json({message: 'Deleted'})
                                }
                            })

                        } else {
                            res.status(401).json({message: "Access denied"})
                        }
                    }))
                }

            }
        })

    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }

}




