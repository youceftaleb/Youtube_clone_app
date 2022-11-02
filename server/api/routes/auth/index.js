const express = require('express')
const router = express.Router()
const AuthController = require('../../controllers/auth')

module.exports = () => {
    // * register
    router.post('/auth/register', AuthController.register)
    // * login
    router.post('/auth/login', AuthController.login)

    // * google auth
    router.post('/auth/google')

    return router;
}