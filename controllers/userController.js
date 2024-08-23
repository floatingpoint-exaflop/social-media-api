const { User, Thought } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //get one user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.userId
            }).populate('thoughts');
            if (!user) {
                return res.status(404).json({message: 'No user found with the specified ID.'})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //delete one user and their thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.userId
            })
            if (!user) {
                return res.status(404).json({message: 'No user found with the specified ID.'})
            }
            await Thought.deleteMany({ _id: { $in: user.usedId}});
            res.json({message: 'This user and all their posted thoughts have been deleted.'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { runValidators: true, new: true },
            )
            if (!user) {
                res.status(404).json({message: 'No user found with the specified ID.'})
            }
            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },


    //add a friend for a user
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId} },
                { runValidators: true, new: true },
            )
            if (!user) {
                res.status(404).json({message: 'No user found with the specified ID.'})
            }
            res.json({message: 'Friend added!'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },
    
    //remove a friend from a user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendId }},
                { runValidators: true, new: true },
            )
            if (!user) {
                res.status(404).json({message: 'No user found with the specified ID.'})
            }
            res.json({message: 'Friend removed!'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    }
}