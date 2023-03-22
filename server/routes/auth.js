const Router = require("express")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const db = require('../db/db')
const path = require("path");
const router = new Router()
require("dotenv").config({
    path: path.resolve(__dirname, './db/.env')
});


router.post('/registration', [
        check('username', `username cant be empty`)
            .notEmpty(),
        check('password', 'Password must be longer that 4')
            .isLength({min: 5, max: 36})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {username, password} = req.body

            const existUser = 'SELECT * FROM users WHERE username = ?'
            await db.execute(existUser, [username], async (err, result) => {
                if (err) {
                    console.log(err, null)
                } else {
                    if (result.length > 0) {
                        return res.status(400).json({message: `User with email ${username} already exist`})
                    } else {
                        const hashedPassword = await bcrypt.hash(password, 6)
                        const addedUserSql = "INSERT INTO users (username, password) VALUES(?,?)";
                        await db.execute(addedUserSql, [username, hashedPassword], (err, result) => {
                            if (err) {
                                console.log(err, null)
                            } else {
                                console.log(result)
                                return res.json({message: "User was created."})
                            }
                        })

                    }

                }
            })

        } catch (err) {
            console.log(err)
            res.send({message: "Server error"})
        }
    })


router.post('/login',
    [
        check('username', `username cant be empty`)
            .notEmpty(),
        check('password', 'Password must be longer that 4')
            .isLength({min: 5, max: 36})
    ],
    async (req, res) => {
        try {
            const {username, password} = req.body
            const existUser = 'SELECT id, password FROM users WHERE username = ?'
            await db.execute(existUser, [username], async (err, result) => {
                if (err) {
                    console.log(err, null)
                }
                if (!result.length) {
                    return res.status(400).json({message: `User with username: ${username} not found`})
                } else if (result.length > 0) {
                    const userId = result[0].id
                    const hashedPassword = result[0].password
                    const secretKey = process.env.secret_key
                    const isValidPass = bcrypt.compare(password, hashedPassword)
                    if (!isValidPass) {
                        return res.status(400).json({message: 'Pass is not correct'})
                    } else {
                        const token = jwt.sign({id: userId, username:username}, secretKey, {expiresIn: "1h"})
                        return res.cookie("UserCookies", token, {
                            maxAge: 1000 * 60 * 60,
                            path: "/",
                            httpOnly:true
                        })
                            .json({
                            token,
                            status: {
                                status: "200",
                                text:"You are logged in",
                                id: userId,
                                username: username
                            }
                        })

                    }
                }


            })
        } catch (err) {
            console.log(err)
            res.send({message: "Server Error"})
        }
    })

module.exports = router

