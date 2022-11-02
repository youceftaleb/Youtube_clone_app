const Comment = require('../models/Comment')
const Video = require('../models/Video')
exports.addComment = async (req, res) => {
    try {
        const comment = new Comment({
            ...req.body,
            userId: req.user.user_id,
            videoId: req.params.videoId
        })
        const savedComment = await comment.save()
        res.status(200).send({
            message: "comment added successfully",
            data: savedComment
        })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) return res.status(404).send({ message: "comment not found" })
        const video = await Video.findById(comment.videoId)
        if (!video) {
            await Comment.findByIdAndDelete(req.params.id);
            return res.status(409).send({ message: "this is a comment of a none existing video and it has been removed" })
        }
        if (req.user.user_id === comment.userId || req.user.user_id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            return res.status(200).send({ message: "comment deleted successfully" })
        }
        res.status(403).send({ message: "you are not allowed to delete this comment" })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        if (comments.length == 0) return res.status(404).send({ message: "this video has no comments" })
        res.status(200).send({ message: 'comments of this video found', data: comments })
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Something went wrong")
    }
}