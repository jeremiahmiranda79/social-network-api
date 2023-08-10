const { Thought, User } = require('../models');

module.exports = {
    // `GET` all thoughts
    async getAllThoughts(req, res) {
        try {
          const thought = await Thought.find();
    
          const thoughtObj = {
            thought,
          };
    
          res.json(thoughtObj);
          
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    // `GET` to get a single thought by its `_id`
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ 
            message: `No thought found with ID: '${req.params.thoughtId}'!` 
          });
        }
  
        res.json({
          thought,
        });

      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    async createNewThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id }},
            { new: true }
          );

          if (!user) {
            return res.status(404).json({
              message: `Thought created, but found no user with ID ${thought._id}!`,
            })
          }

          res.json(`Created the thought: '${thought.thoughtText}' 🎉`);

        } catch (err) {
          res.status(500).json(err);
        }
      },

    // `PUT` to update a thought by its `_id`
    async updateSingleThought(req, res) {
      try {
        const thought = await Thought.findByIdAndUpdate(
          { _id: req.params.thoughtId },
          { $set: {thoughtText: req.body.thoughtText} },
          { new: true } // runValidators: true, 
        );
  
        if (!thought) {
          return res.status(404).json({ 
            message: `No thought found with ID: '${req.params.thoughtId}'!` 
          });
        }
  
        res.json(thought);

      } catch (err) {
        res.status(500).json(err);
      }
    },

    // `DELETE` to remove a thought by its `_id`
    async deleteSingleThought(req, res) {
        try {
          const thought = await Thought.findByIdAndDelete({ 
            _id: req.params.thoughtId 
          });
    
          if (!thought) {
            return res.status(404).json({
              message: `No thought found with ID: '${req.params.thoughtId}'!` 
            });
          }

          res.json({ 
            message: `Thought with ID: '${req.params.thoughtId}' successfully deleted!` 
          });

        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    
    // 'POST' a new reaction
    async createNewReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username
          }}},
          { 
            runValidators: true, 
            new: true 
          }
        );
  
        if (!thought) {
          return res.status(404).json({
            message: `No thought found with ID: '${req.params.thoughtId}'!` 
          });
        }

        res.json(thought);

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // 'DELETE' a reaction
    async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          
          { $pull: { reactions: {
            reactionId: req.params.reactionId,
          }}},
          { 
            runValidators: true, 
            new: true 
          }
        );
  
        if (!thought) {
          return res.status(404).json({
            message: `No thought found with ID: '${req.params.thoughtId}'!` 
          });
        }

        res.json(thought);

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    
    //TODO: **BONUS**: Remove a user's associated thoughts when deleted.
}