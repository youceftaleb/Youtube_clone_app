const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String
    },
    thumbnailUrl: {
        type: String
    },
    videoUrl: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        // todo: add a default category
        default: ["New"]

    }

}, { timestamps: true });

const Video = mongoose.model('videos', videoSchema);

module.exports = Video;