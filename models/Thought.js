const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: [1, 'Your thought must contain at least one character.'],
            maxLength: [280, 'Your thought must contain at most 280 characters.']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
        },
        username: {

        },
        reactions: {
            
        }
    },
    {
        toJson: {
            getters: true
        },
        toObject: {
            getters: true
        }
    }
)

const Thought = model('thought', thoughtSchema);
module.exports = Thought;