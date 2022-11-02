const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/user')
const verifyToken = require('../../middlewares/verifyToken')

module.exports = () => {
    // update
    router.put('/users/:id', verifyToken, UserController.updateUser)
    // delete
    router.delete('/users/:id', verifyToken, UserController.deleteUser)
    // get
    router.get('/users/:id', UserController.getUser)
    // sub
    router.put('/users/sub/:id', verifyToken, UserController.subUser)
    // unsub
    router.put('/users/unsub/:id', verifyToken, UserController.unsubUser)
    // like
    router.put('/like/:videoId', verifyToken, UserController.like)
    // dislike
    router.put('/dislike/:videoId', verifyToken, UserController.dislike)
    return router;
}