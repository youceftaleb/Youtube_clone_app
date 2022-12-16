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
        type: String,
        default: 'https://via.placeholder.com/150'
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
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    },
    category: {
        type: [String],
        // todo: add a default category
        default: ["New"]
    }
}, { timestamps: true });

const Video = mongoose.model('videos', videoSchema);

module.exports = Video;