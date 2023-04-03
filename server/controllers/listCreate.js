const db = require("../db/db")
const path = require("path");
const {listCreateSchema, updateListSchema, friendDeleteSchema} = require("../validation/validation");
require("dotenv").config({
    path: path.resolve(__dirname, '../db/.env')
});


module.exports.getList = async (req, res) => {
    try {
        // fetched from middleware, token verif and user Data.
        const id = req.user.id
        const getList = "SELECT list.id, todo from list, users where fk_user = users.id and users.id =?";
        db.execute(getList, [id], (error, result) => {
            if (error) {
                res.status(500).json({message: 'Internal server error'})
            } else {
                res.send(result)
            }
        });
    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }

}


module.exports.createList = (req, res) => {
    try {
        const validation = listCreateSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        } else {
            //fetched from middleware, verif userdata
            const id = req.user.id
            const {todo} = validation.value
            if (todo === undefined) {
                res.status(400).json({message: 'Bad Request'})
            } else {
                const createList = "INSERT INTO list (fk_user, todo) VALUES (? , ?)";
                db.execute(createList, [id, todo], (err, result) => {
                    if (err) {
                        res.status(500).json({message: 'Internal server error'})
                    } else {
                        res.status(201).json({message: 'Created'})
                    }
                })
            }

        }
    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }
}


module.exports.updateList = async (req, res) => {
    try {

        const validation = updateListSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        } else {
            const {id, todo} = validation.value
            const userId = req.user.id
            if (todo === undefined || id === undefined) {
                res.status(400).json({message: 'Bad Request'})
            } else {
                const checkSql = 'SELECT fk_user, users.id, users.username, list.todo FROM list, users WHERE list.fk_user = users.id AND list.id =?'
                const updateList = "UPDATE list SET todo = ? WHERE id = ?";

                db.execute(checkSql, [id], (err, result) => {
                    if (err) {
                        res.status(500).json({message: 'Internal server error'})
                    } else if (!result.length) {
                        res.status(401).json({message: 'Access Denied, you cant modify todos if its not yours.'})
                    } else {
                        const updateId = id
                        if (result.length > 0) {
                            result.map((async data => {
                                const fKey = data.fk_user
                                if (fKey === userId) {
                                    await db.execute(updateList, [todo, updateId], (err, result) => {
                                        if (err) {
                                            res.status(500).json({message: 'Internal server error'})
                                        } else {
                                            res.status(200).json({message: 'Updated'})
                                        }
                                    })
                                } else {
                                    res.status(401).json({message: 'Access Denied, you cant modify todos if its not yours.'})
                                }
                            }))
                        }

                    }
                })

            }

        }

    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }

}


module.exports.deleteList = async (req, res) => {
    try {
        const validation = friendDeleteSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        } else {
            const {id} = validation.value
            const userId = req.user.id;

            if (id === undefined) {
                res.status(400).json({message: 'Bad Request'})

            } else {
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

            }
        }

    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }

}




