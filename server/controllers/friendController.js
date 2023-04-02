const jwt = require("jsonwebtoken");
const db = require("../db/db");
const path = require("path");
const {friendListSchema, showFriendListSchema} = require("../validation/validation")
require("dotenv").config({
    path: path.resolve(__dirname, '../db/.env')
});


module.exports.getFriend = async (req, res) => {
    try {
        const validation = friendListSchema.validate(req.body);
        if (validation.error) {
            console.log(validation.error)
            return res.status(400).json(validation.error.details[0].message);
        }
        const {friendId} = validation.value

        console.log(friendId)
        if (friendId === undefined) {
            res.status(400).json({
                message: 'Bad Request:' +
                    'Please check if you entered the correct friendId' +
                    'it must be in the following format - friendId:id where id is user_id'
            })
        }

        const secretKey = process.env.secret_key
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, secretKey)
        req.user = decode
        const id = decode.id;

        const createList = "INSERT INTO friend (fk_users, fk_friend) VALUES (? , ?)";
        db.execute(createList, [id, friendId], (err, result) => {
            if (err) {
                res.status(401).json({message: 'User not found, or already your friend'})
            } else {
                res.status(201).json({message: 'Friend added'})
            }
        })
    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }
}


module.exports.showUsers =
    async (req, res) => {
        try {
            const showUsers = "SELECT id, username FROM users";
            db.execute(showUsers, (err, result) => {
                if (err) {
                    res.status(500).json({message: 'Internal server error'})
                } else {
                    res.send(result)
                }
            })
        } catch (e) {
            res.status(500).json({message: 'Internal server error'})
        }
    }


module.exports.showFriend = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Bad token'})
        }
        const decodedJwt = jwt.decode(token, {completed: true})
        req.user = decodedJwt
        const id = decodedJwt.id

        const getList = "SELECT friend.id, u.username\n" +
            "from friend\n" +
            "         INNER JOIN users\n" +
            "                    ON friend.fk_users = users.id\n" +
            "         JOIN users u on u.id = friend.fk_friend\n" +
            "WHERE users.id = ?";

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


module.exports.showFriendList = async (req, res) => {
    try {
        const validation = showFriendListSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        }
        const {username} = validation.value

        if (username === undefined) {
            res.status(400).json({message: 'Bad Request'})
        }

        const getList = "SELECT todo, users.id from users, list where fk_user = users.id and users.username = ?"
        db.execute(getList, [username], (error, result) => {
            if (error) {
                res.status(500).json({message: 'Internal server error'})
            }
            if (!result.length) {
                res.status(400).json({message: 'Your friend dont have any todos'})
            }
            else {
                res.send(result)
            }
        });
    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }

}


module.exports.deleteFriend = async (req, res) => {
    try {

        const secretKey = process.env.secret_key
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, secretKey)
        req.user = decode
        const userId = decode.id;
        const {id} = req.body
        const checkSql = 'SELECT fk_users, fk_friend, users.id, users.username FROM friend, users WHERE friend.fk_users = users.id AND friend.id =?';
        const deleteList = "DELETE FROM friend WHERE id = ?";
        await db.execute(checkSql, [id], async (err, result) => {
            if (err) {
                res.status(500).json({message: 'Internal server error'})
            }
            if (!result.length) {
                res.status(204).json({message: 'Field cant be empty'})
            }

            const deleteId = id

            if (result.length > 0) {
                const fk = result.map((async data => {
                    const usersRef = data.fk_users
                    if (usersRef === userId) {
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
        })

    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }

}

