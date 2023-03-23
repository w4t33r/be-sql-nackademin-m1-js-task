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
        const {friendId} = req.body;
        const createList = "INSERT INTO friend (fk_users, fk_friend) VALUES (? , ?)";
        db.execute(createList, [id, friendId], (err, result) => {
            if (err) {
                res.status(401).json({message: 'User not found, or already your friend'})
            } else {
                res.status(200).json({message: 'Friend added'})
            }
        })
    } catch (e) {
        res.status('Server Error')
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
        const {id} = req.body
        const getList = "SELECT u.username from friend\n" +
            "INNER JOIN users\n" +
            "ON friend.fk_users = users.id\n" +
            "JOIN users u on u.id = friend.fk_friend\n" +
            "\n" +
            "WHERE users.id = ?";

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

        console.log('reqbody',id)

        await db.execute(checkSql, [id], async (err, result) => {
            if (err) {
                console.log(err, null)
            }
            if(!result.length) {
                res.send('Field cant be empty')
            }
            console.log('res.lenght',result.length)
            const deleteId = id
            console.log('DeletedID',deleteId)
            if(result.length > 0) {
                const fk = result.map((async data => {
                    const usersRef = data.fk_users
                    const sKey = data.fk_friend

                    console.log('users_F', usersRef)
                    console.log('usersID',userId)
                    console.log('friend_F', sKey)
                    if(usersRef === userId) {
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

