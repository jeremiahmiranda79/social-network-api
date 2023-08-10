const { Schema, model, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema( 
    {
        reactionId: {
            //* Use Mongoose's ObjectId data type 
            type: Schema.Types.ObjectId,
            //* Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),     
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            // * Date
            type: Date,
            // * Set default value to the current timestamp
            default: Date.now,
            // * Use a getter method to format the timestamp on query
            get: (value) => dateFormat(value),
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            //* Must be between 1 and 280 characters
            thoughtTextMin: { $lte: 1 }, 
            thoughtTextMax: { $gte: 280 }, 
        },
        createdAt: {
            //* Date
            type: Date,
            //* Set default value to the current timestamp
            default: Date.now,
            //* Use a getter method to format the timestamp on query
            get: (value) => dateFormat(value),
        },
        //(The user that created this thought)
        username: { 
            type: String,
            required: true,
        },
        //* Array of nested documents created with the `reactionSchema`
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;