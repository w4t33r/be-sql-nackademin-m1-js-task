const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const {createList, updateList, deleteList, getList} = require("../controllers/listCreate");
const {getFriend, showFriend, deleteFriend, showUsers, showFriendList} = require("../controllers/friendController");


router.post('/save', authMiddleware,createList)
router.put('/update',authMiddleware ,updateList)
router.post('/delete', authMiddleware,deleteList)
router.get('/getList',authMiddleware,getList)

router.get('/friend/id',authMiddleware,showFriend)
router.post('/friend/delete/id',authMiddleware,deleteFriend)

router.post('/friend/users/add',authMiddleware,getFriend)
router.get('/friend/users',authMiddleware, showUsers)

router.post('/friend/showList/id',authMiddleware, showFriendList)


module.exports = router