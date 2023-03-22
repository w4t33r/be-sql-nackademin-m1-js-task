const Router = require("express")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = new Router()
require('dotenv').config()

const secretKey = process.env.secret_key

const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',
    [
        check('email', 'email is not correct')
            .isEmail(),
        check('password', 'Password must be longer that 4')
            .isLength({min: 5, max: 36})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {email, password} = req.body
            const existUser = await User.findOne({email})
            if (existUser) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashedPassword = await bcrypt.hash(password, 6)
            const user = new User({email, password: hashedPassword})

            await user.save()
            return res.json({message: "User was created."})
        } catch (err) {
            console.log(err)
            res.send({message: "Server error"})
        }
    })



router.post('/login',
    [
        check('email', 'its not a email')
            .isEmail()
    ],
    async (req, res) => {
        try {
           const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message:'User not found'})
            }
            const isValidPass = bcrypt.compareSync(password, user.password)
            if (!isValidPass) {
                return res.status(400).json({message:'Pass is not correct'})
            }

            const token = jwt.sign({id:user.id},secretKey, {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar
                }
            })
        } catch (err) {
            console.log(err)
            res.send({message: "Server error"})
        }
    })



router.get('/auth', authMiddleware,
    [
        check('email', 'its not a email')
            .isEmail()
    ],
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, secretKey, {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar
                }
            })
        } catch (err) {

        }
    })


module.exports = router

