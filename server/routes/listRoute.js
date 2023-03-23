const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const {createList, updateList, deleteList, getList} = require("../controllers/listCreate");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

//router.get('/full', authMiddleware, getList)
router.post('/save', createList)
router.put('/update', updateList)
router.post('/delete', deleteList)
router.get('/getList', getList)


module.exports = router