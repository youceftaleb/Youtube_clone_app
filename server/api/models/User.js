const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    subNumber: {
        type: Number,
        default: 0
    },
    subscriptions: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = User;