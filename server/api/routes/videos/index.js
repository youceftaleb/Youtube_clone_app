const express = require('express')
const router = express.Router()
const VideoController = require('../../controllers/video')
const verifyToken = require('../../middlewares/verifyToken')

module.exports = () => {
    // create
    router.post('/videos', verifyToken, VideoController.AddVideo)
    // update
    router.put('/videos/:id', verifyToken, VideoController.UpdateVideo)
    //delete
    router.delete('/videos/:id', verifyToken, VideoController.DeleteVideo)
    // subscriptions videos
    router.get('/videos/subs', verifyToken, VideoController.subsVideos)
    // view
    router.put('/videos/view/:id', VideoController.AddView)
    // trend videos
    router.get('/videos/trend', VideoController.trendVideos)
    // random videos
    router.get('/videos/random', VideoController.randomVideos)
    // search query 
    router.get('/videos/search', VideoController.search)
    // tag query
    router.get('/videos/tags', VideoController.getByTag)
    // get
    router.get('/videos/:id', VideoController.GetVideo)
    // like
    router.put('/videos/like/:videoId', verifyToken, VideoController.like)
    // dislike
    router.put('/videos/dislike/:videoId', verifyToken, VideoController.dislike)

    return router;
}