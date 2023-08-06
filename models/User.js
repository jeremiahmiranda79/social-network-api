const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create User model
const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //must match a valid email address (look into Mongoose's matching validation)
            match: /^\S+@\S+$/
            
        },
        thoughts: {
            //array of `_id` values referencing the `Thought` model

        },
        friends: {
            //array of `_id` values referencing the `User` model (self-reference)
            
        }    
    },
    {
        toJSON: {
          getters: true,
        },
        // id: false,
    }
);

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

const User = model('user', userSchema);

module.exports = User;