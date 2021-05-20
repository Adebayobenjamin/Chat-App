const router = require('express').Router();
const { RequiresAuth } = require('../middleware/authmiddleware')
const {chatLoginPost, chatroomGet, chatroomLeave} = require('../controller/authcontroller');

router.post('/chatroom', chatLoginPost);
router.get('/chatroom', RequiresAuth, chatroomGet );
router.get('/leavechat', chatroomLeave)

module.exports = router;