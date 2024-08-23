const { Thought, Reaction, User } = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //get one thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId
            })
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID.' });
              }
            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const newUser = await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id}},
                {new: true}
            );
            console.log(newUser)
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //delete one thought and its reactions
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.thoughtId
            })
            if (!thought) {
                return res.status(404).json({message: 'No thought found with the specified ID.'})
            }
            res.json({message: 'This thought and all its posted reactions have been deleted.'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            )
            if (!thought) {
                res.status(404).json({message: 'No thought found with the specified ID.'})
            }
            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    //add a reaction for a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body }},
                { runValidators: true, new: true },
            )
            if (!thought) {
                res.status(404).json({message: 'No thought found with the specified ID.'})
            }
            res.json({message: 'Reaction added!'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },
    
    //remove a reaction from a thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {_id: req.params.reactionId }}},
                { runValidators: true, new: true },
            )
            if (!thought) {
                res.status(404).json({message: 'No thought found with the specified ID.'})
            }
            if (thought.reactions.some(reaction => reaction.reactionId.toString() === req.params.reactionId)) {
                return res.status(500).json({ message: 'Reaction could not be deleted.' });
            }
            console.log(thought)
            res.json({message: 'Reaction deleted!'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    }
}