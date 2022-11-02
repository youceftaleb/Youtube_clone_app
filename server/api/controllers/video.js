const Video = require('../models/Video')
const User = require('../models/User')
exports.AddVideo = async (req, res) => {
    try {
        const { title, videoUrl } = req.body;
        // ! form validation server side
        if (!(title && videoUrl)) return res.status(400).send({ message: "all input are required" });

        const newVideo = new Video({ userId: req.user.user_id, ...req.body })
        const savedVideo = await newVideo.save()
        res.status(200).send({ message: 'Video created successfully', data: savedVideo })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || "Something went wrong" })
    }
}
exports.UpdateVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return res.status(404).send({ message: "Video not found" })
        if (req.user.user_id === video.userId) {
            const UpdatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true,
                useFindAndModify: false,
            })
            res.status(200).send({ message: 'Video updated', data: UpdatedVideo })
        } else {
            res.status(403).send({ message: 'you are not allowed to edit this video' })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || "Something went wrong" })
    }
}
exports.DeleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return res.status(404).send({ message: "Video not found" })
        if (req.user.user_id === video.userId) {
            const deleteVideo = await Video.findByIdAndDelete(req.params.id)
            res.status(200).send({ message: 'Video deleted' })
        } else {
            res.status(403).send({ message: 'you are not allowed to delete this video' })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || "Something went wrong" })
    }
}
exports.GetVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return res.status(404).send({ message: 'Video not found' })
        res.status(200).send({ message: 'Video found successfully', data: video })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || "Something went wrong" })
    }
}

exports.AddView = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        }, {
            new: true, useFindAndModify: false
        })
        if (!video) return res.status(404).send({ message: "video not found" })
        res.status(200).send({ message: 'view added', data: video })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || "Something went wrong" })
    }
}
exports.trendVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        if (!videos) return res.status(404).send({ message: 'videos not found' })
        res.status(200).send({ message: 'trend videos sorted', data: videos })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || "Something went wrong" })
    }
}
exports.randomVideos = async (req, res) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 20 } }]) // todo
        if (!videos) return res.status(404).send({ message: 'videos not found' })
        res.status(200).send({ message: 'videos aggregated', data: videos })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || "Something went wrong" })
    }
}
exports.subsVideos = async (req, res) => {
    try {
        const user = await User.findById(req.user.user_id)
        const subscibedChannels = user.subscriptions
        if (subscibedChannels === []) return res.status(200).send({ message: 'you are not subscribed to any channel' })
        const list = await Promise.all(
            subscibedChannels.map(channelId => {
                return Video.find({ userId: channelId })
            })
        )
        res.status(200).send({ message: "subs videos retreived", data: list.flat().sort((a, b) => b.createdAt - a.createdAt) })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || "Something went wrong" })
    }
}