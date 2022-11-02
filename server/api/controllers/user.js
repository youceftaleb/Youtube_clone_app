const User = require('../models/User')

exports.updateUser = async (req, res) => {
    if (req.params.id === req.user.user_id) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {
                new: true,
                useFindAndModify: false,
            });
            res.status(200).json({ message: "User updated", data: user });
        } catch (err) {
            res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
        }
    } else {
        return res.send({ message: "you can't update this user" })
    }
}

exports.deleteUser = async (req, res) => {
    if (req.params.id === req.user.user_id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
        }
    } else {
        return res.send({ message: "you can't delete this user" })
    }
}
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send({ message: "User found successfully", data: user })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
exports.subUser = async (req, res) => {
    try {
        if (req.params.id !== req.user.user_id) {
            await User.findByIdAndUpdate(req.user.user_id, { $push: { subscriptions: req.params.id } });
            await User.findByIdAndUpdate(req.params.id, { $inc: { subNumber: 1 } });
            res.status(200).send({ message: 'subscription successful' });
        } else {
            res.status(403).send({ message: "You can't subscribe to yourself" })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
exports.unsubUser = async (req, res) => {
    try {
        const subedUser = await User.findById(req.params.id)
        if (subedUser.subNumber > 0) {
            await User.findByIdAndUpdate(req.user.user_id, {
                $pull: { subscriptions: req.params.id }
            });
            await User.findByIdAndUpdate(req.params.id, { $inc: { subNumber: -1 } });
            res.status(200).send({ message: 'Unsubscription successful' });
        } else {
            res.status(200).send({ message: 'User is already at 0 subs' })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
exports.like = async (req, res) => {
    try {

    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
exports.dislike = async (req, res) => {
    try {

    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
