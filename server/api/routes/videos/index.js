const express = require('express')
const router = express.Router()
const VideoController = require('../../controllers/video')
const checkLogin = require('../../middlewares/checkLogin')

module.exports = () => {
    // create
    router.post('/videos', checkLogin, VideoController.AddVideo)
    // update
    router.put('/videos/:id', checkLogin, VideoController.UpdateVideo)
    //delete
    router.delete('/videos/:id', checkLogin, VideoController.DeleteVideo)
    // subscriptions videos
    router.get('/videos/subs', checkLogin, VideoController.subsVideos)
    // view
    router.put('/videos/view/:id', VideoController.AddView)
    // trend videos
    router.get('/videos/trend', VideoController.trendVideos)
    // random videos
    router.get('/videos/random', VideoController.randomVideos)
    // search query 
    router.get('/videos/search', VideoController.search)
    // category query
    router.get('/videos/category', VideoController.getByCategory)
    // get
    router.get('/videos/:id', VideoController.GetVideo)
    // like
    router.put('/videos/like/:videoId', checkLogin, VideoController.like)
    // dislike
    router.put('/videos/dislike/:videoId', checkLogin, VideoController.dislike)
    // get all videos of a user
    router.get('/videos/user/:id', VideoController.getVideosOfChannel)

    return router;
}