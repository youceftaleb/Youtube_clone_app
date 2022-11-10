const express = require('express')
const router = express.Router()
const CommentController = require('../../controllers/comment')
const checkLogin = require('../../middlewares/checkLogin')

module.exports = () => {
    // add a comment
    router.post('/comments/:videoId', checkLogin, CommentController.addComment)
    // delete a comment
    router.delete('/comments/:id', checkLogin, CommentController.deleteComment)
    // get all comments of a video
    router.get('/comments/:videoId', CommentController.getComments)

    return router;
}