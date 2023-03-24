const jwt = require("jsonwebtoken");
const db = require("../db/db");

const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, '../db/.env')
});


module.exports.getFriend = async (req, res) => {
    try {
        const secretKey = process.env.secret_key
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, secretKey)
        req.user = decode
        const id = decode.id;
        //On postman write "friendId:id"
        const {friendId} = req.body;
        if(friendId === undefined) {
            res.status(400).json({message: 'Bad request'})
        }
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



module.exports.showUsers = async (req, res) => {
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
        const decodedJwt = jwt.decode(token, {completed:true})
        req.user = decodedJwt
        const id = decodedJwt.id

        const getList = "SELECT  friend.id, u.username from friend\n" +
            "INNER JOIN users\n" +
            "ON friend.fk_users = users.id\n" +
            "JOIN users u on u.id = friend.fk_friend\n" +
            "\n" +
            "WHERE users.id = ?";

        db.execute(getList, [id], (error, result) => {
            if(error) {
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
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Bad token'})
        }
        const {username} = req.body

        const getList = "SELECT todo, users.id from users, list where fk_user = users.id and users.username = ?"

        db.execute(getList, [username], (error, result) => {
            if(error) {
                res.status(500).json({message: 'Internal server error'})
            } else {
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
            if(!result.length) {
                res.status(204).json({message: 'Field cant be empty'})
            }

            const deleteId = id

            if(result.length > 0) {
                const fk = result.map((async data => {
                    const usersRef = data.fk_users
                    if(usersRef === userId) {
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

