const { Schema , model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please enter a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        toObject: {
            getters: true,
            virtuals: true
        },
    }
);

//used above to confirm user email.
function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    return regex.test(email);
}

//gets a count of the user's friends.
userSchema.virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

const User = model('user', userSchema);
module.exports = User;