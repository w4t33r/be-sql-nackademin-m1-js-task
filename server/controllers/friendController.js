const db = require("../db/db");
const path = require("path");
const {friendListSchema, showFriendListSchema, friendDeleteSchema} = require("../validation/validation")

require("dotenv").config({
    path: path.resolve(__dirname, '../db/.env')
});


module.exports.getFriend = async (req, res) => {
    try {
        const validation = await friendListSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        } else {
            const {friendId} = validation.value
            // fetched from middleware, token verif and user Data.
            const currentUser = req.user.id;

            if (friendId === undefined) {
                res.status(400).json({
                    message: 'Bad Request:' +
                        'Please check if you entered the correct friendId' +
                        'it must be in the following format - friendId:id where id is user_id'
                })
            }  else {
                const createList = "INSERT INTO friend (fk_users, fk_friend) VALUES (? , ?)";
                await db.execute(createList, [currentUser, friendId], (err, result) => {
                    if (err) {
                        res.status(401).json({message: 'User not found, or already your friend'})
                    }
                    else {
                        res.status(201).json({message: 'Friend added'})
                    }
                })
            }
        }
    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }
}


module.exports.showUsers =
    async (req, res) => {
        try {
            // fetched from middleware, token verif and user Data.
            const userId = req.user.id;
            const showUsers = "SELECT id, username FROM users where id !=?";
            db.execute(showUsers, [userId], (err, result) => {
                if (err) {
                    res.status(500).json({message: 'Internal server error'})
                } else {
                    res.send({result, userId});

                }
            })
        } catch (e) {
            res.status(500).json({message: 'Internal server error'})
        }
    }


module.exports.showFriend = async (req, res) => {
    try {
        // fetched from middleware, token verif and user Data.
        const id = req.user.id;
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

        const validation = friendDeleteSchema.validate(req.body);
        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        }
        const {id} = validation.value

        if (id === undefined) {
            res.status(400).json({message: 'Bad Request'})
        }

        // fetched from middleware, token verif and user Data.
        const userId = req.user.id;


        const checkSql = 'SELECT fk_users, fk_friend, users.id, users.username FROM friend, users WHERE friend.fk_users = users.id AND friend.id =?';
        const deleteList = "DELETE FROM friend WHERE id = ?";


        await db.execute(checkSql, [id], async (err, result) => {
            if (err) {
                res.status(500).json({message: 'Internal server error'})
            }
            if (!result.length) {
                return res.status(400).json({message: 'User is not your friend'})
            } else {
                const deleteId = id
                if (result.length > 0) {
                    result.map((async data => {
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

            }


        })

    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }

}

