const { Schema, model } = require('mongoose');
// const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema( // (SCHEMA ONLY)
    {
        reactionId: {
            //* Use Mongoose's ObjectId data type
            // type:mongoose.Schema.Types.ObjectID,ref:'reaction' 
            //* Default value is set to a new ObjectId
            
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
            default: Date.now,

            // * Set default value to the current timestamp

            // * Use a getter method to format the timestamp on query
            
        }
    },
    {
        // toJSON: {
        //   getters: true,
        // },
        // id: false,
    }
);

// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;