const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/user')
const checkLogin = require('../../middlewares/checkLogin')

module.exports = () => {
    // update
    router.put('/users/:id', checkLogin, UserController.updateUser)
    // delete
    router.delete('/users/:id', checkLogin, UserController.deleteUser)
    // get
    router.get('/users/:id', UserController.getUser)
    // sub
    router.put('/users/sub/:id', checkLogin, UserController.subUser)
    // unsub
    router.put('/users/unsub/:id', checkLogin, UserController.unsubUser)

    return router;
}