const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const {createList, updateList, deleteList, getList} = require("../controllers/listCreate");


router.post('/save', authMiddleware,createList)
router.put('/update',authMiddleware ,updateList)
router.post('/delete', authMiddleware,deleteList)
router.get('/getList',authMiddleware,getList)


module.exports = router