const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: [50, 'Reactions be must 50 characters or less.']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    {
        toJSON: {
            getters: true
        },
        toObject: {
            getters: true
        }
    }
);

module.exports = reactionSchema;