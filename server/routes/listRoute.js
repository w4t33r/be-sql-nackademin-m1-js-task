const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const {getList, saveList, updateList, deleteList} = require("../controllers/listController");
const {check, validationResult} = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const listModel = require("../models/List");
require('dotenv').config()

router.get('/full', authMiddleware, getList)
router.post('/save', authMiddleware, saveList)
router.post('/update', authMiddleware, updateList)
router.post('/delete', authMiddleware, deleteList)


router.get('/main/:id', authMiddleware, async (req, res) => {
    const secretKey = process.env.secret_key
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({message: 'Bad token'})
    }
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    console.log('DECODE', decoded.id)
    const getTodo = await User.findById(req.user.id)
    res.send(getTodo)

});

module.exports = router