const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const {createList, updateList, deleteList, getList} = require("../controllers/listCreate");
const {getFriend, showFriend, deleteFriend} = require("../controllers/friendController");


router.post('/save', authMiddleware,createList)
router.put('/update',authMiddleware ,updateList)
router.post('/delete', authMiddleware,deleteList)
router.get('/getList',authMiddleware,getList)

router.get('/friend/id',authMiddleware,showFriend)
router.get('/friend/delete/id',authMiddleware,deleteFriend)




router.post('/friend',authMiddleware,getFriend)


module.exports = router