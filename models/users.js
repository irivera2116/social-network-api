const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/, 'Must be a valid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// creates a virtual which GETS the amount of friends 
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('users', userSchema);

module.exports = User;
