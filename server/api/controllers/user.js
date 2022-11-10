const User = require('../models/User')

exports.updateUser = async (req, res) => {
    try {
        if (req.params.id === req.user.user_id) {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {
                new: true,
                useFindAndModify: false,
            });
            res.status(200).json({ message: "User updated", data: user });
        } else {
            return res.send({ message: "you can't update this user" })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }

}

exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.user.user_id) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.send({ message: "you can't delete this user" })
        }
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' });
    }

}
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" })
        res.status(200).send({ message: "User found successfully", data: user })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message || 'Something went wrong' })
    }
}
exports.subUser = async (req, res) => {
    try {
        if (req.params.id !== req.user.user_id) {
            await User.findByIdAndUpdate(req.user.user_id, { $addToSet: { subscriptions: req.params.id } });
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
        const user = await User.findById(req.params.id)
        if (user.subNumber > 0) {
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

