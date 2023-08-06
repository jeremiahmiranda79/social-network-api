const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');


module.exports = {
    //TODO: `GET` all users
    async getAllUsers(req, res) {
        try {
          const user = await User.find();
    
          const userObj = {
            user,
            // headCount: await headCount(),
          };
    
          res.json(userObj);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    //TODO: `GET` a single user by its `_id` and populated thought and friend data
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
  
        res.json({
          user,
          // grade: await grade(req.params.studentId),
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    //TODO: `POST` a new user:
    async createNewUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    //TODO: `PUT` to update a user by its `_id`
    async updateSingleUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    //TODO: `DELETE` to remove user by its `_id`
    async deleteSingleUser(req, res) {
        try {
          const user = await User.findOneAndRemove({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
    
          const course = await Course.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
          );
    
        //   if (!course) {
        //     return res.status(404).json({
        //       message: 'Student deleted, but no courses found',
        //     });
        //   }
    
          res.json({ message: 'User successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    

    //TODO: **BONUS**: Remove a user's associated thoughts when deleted.

    ////////////////////////////


}