const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default:0
    },
    dislikes: {
        type: Number,
        default:0
    }

}, { timestamps: true });

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;