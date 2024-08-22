const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

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
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJson: {
            getters: true,
            virtuals: true
        },
        toObject: {
            getters: true,
            virtuals: true
        }
    }
)

reactionSchema.virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);
module.exports = Thought;