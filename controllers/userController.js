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
            res.json({message: 'New User Created!', user: user})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //delete one user and their thoughts, and their reactions, and their association with any friends.
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.userId
            })
            if (!user) {
                return res.status(404).json({message: 'No user found with the specified ID.'})
            }
            await Thought.deleteMany({ _id: { $in: user.usedId}});
            await User.updateMany(
                { friends: req.params.userId },
                { $pull: { friends: req.params.userId }}
            )
            await Thought.updateMany(
                { 'reactions.username': user.username },
                { $pull: { reactions: { username: user.username }}}
            )
            res.json({message: 'This user and all their posted thoughts and reactions have been deleted. They also have been removed from all other user friend lists.', user: user})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //update a user, someday I will figure out fixing their username on reactions.
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { runValidators: true, new: true }
            );
    
            if (!user) {
                return res.status(404).json({ message: 'No user found with the specified ID.' });
            }
    
            // if (req.body.username) {
            //     console.log(`Old username: ${user.username}, New username: ${req.body.username}`);
                
            //     // Update username in thoughts
            //     const thoughts = await Thought.updateMany(
            //         { username: user.username },
            //         { $set: { username: req.body.username } }
            //     );
            //     console.log(`Thoughts updated: ${thoughts.nModified}`);
                
            //     // Update username in reactions
            //     const reactions = await Thought.updateMany(
            //         { 'reactions.username': user.username },
            //         { $set: { 'reactions.$[elem].username': req.body.username } },
            //         { arrayFilters: [{ 'elem.username': user.username }] }
            //     );
            //     console.log(`Reactions updated: ${reactions.nModified}`);
            // }
    
            res.json({ message: 'This user has been updated.', user: user });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    


    //add a :friendId 'UserB' for a :userId 'UserA', and vice versa (this is really how most old school social networks functioned, like an AIM BuddyList!)
    async addFriend(req, res) {
        try {
            const userA = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId} },
                { runValidators: true, new: true },
            )
            if (!userA) {
                res.status(404).json({message: 'No user found with the specified ID.'})
            }
            const userB = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: {friends: req.params.userId} },
                { runValidators: true, new: true }
            )
            if (!userB) {
                res.status(404).json({message: 'No friend available with the specified ID.'})
            }
            res.json({message: 'My new best friend!'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },
    
    //remove a :friendId 'UserB' from a :userId 'UserA', and vice versa (If this were followers, I wouldn't do that; it would be easy to add followers as a separate list of associated people where it isn't automatically reciprocal though.)
    async removeFriend(req, res) {
        try {
            const userA = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendId }},
                { runValidators: true, new: true },
            )
            if (!userA) {
                res.status(404).json({message: 'No user found with the specified ID.'})
            }
            const userB = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: {friends: req.params.userId} },
                { runValidators: true, new: true }
            )
            if (!userB) {
                res.status(404).json({message: 'No friend available with the specified ID.'})
            }
            res.json({message: 'Friendship over!'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    }
}