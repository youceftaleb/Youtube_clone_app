const express = require('express')
const router = express.Router()
const CommentController = require('../../controllers/comment')
const verifyToken = require('../../middlewares/verifyToken')

module.exports = () => {
    // add a comment
    router.post('/comments/:videoId', verifyToken, CommentController.addComment)
    // delete a comment
    router.delete('/comments/:id', verifyToken, CommentController.deleteComment)
    // get all comments of a video
    router.get('/comments/:videoId', CommentController.getComments)

    return router;
}