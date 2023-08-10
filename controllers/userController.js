const { User } = require('../models');

module.exports = {
    // `GET` all users
    async getAllUsers(req, res) {
        try {
          const user = await User.find();
    
          const userObj = {
            user,
          };
    
          res.json(userObj);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    // `GET` a single user by its `_id` and populated thought and friend data
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ 
            message: `No user found with ID: '${req.params.userId}'!` 
          });
        }
  
        res.json({
          user,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // `POST` a new user:
    async createNewUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(`Created the user: '${user.username}' 🎉`);

        } catch (err) {
          res.status(500).json(err);
        }
      },

    // `PUT` to update a user by its `_id`
    async updateSingleUser(req, res) {
      try {
        const user = await User.findByIdAndUpdate(
          { _id: req.params.userId },
          { $set: {
            username: req.body.username,
            email: req.body.email
          }},
          {runValidators: true, new: true } 
        );
  
        if (!user) {
          return res.status(404).json({ message: `No user found with id ${req.params.userId}!` });
        }
  
        res.json(user);

      } catch (err) {
        res.status(500).json(err);
      }
    },

    // `DELETE` to remove user by its `_id`
    async deleteSingleUser(req, res) {
        try {
          const user = await User.findByIdAndDelete({ 
            _id: req.params.userId 
          });
    
          if (!user) {
            return res.status(404).json({ 
              message: `No user found with id ${req.params.userId}!` 
            });
          }

          res.json({ 
            message: `User with id ${req.params.userId} successfully deleted!` 
          });

        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    // add Friend {id addtoSet to user id}
    async addFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate({
          _id: req.params.userId,
          $addToSet: {
            friends: req.params.friendId
          },
          new: true
        });

        if (!user) {
          return res.status(404).json({
            message: `No user found with id: '${req.params.userId}'!` 
          });
        }

        res.json(user);

      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // remove friend
    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate({
          _id: req.params.userId,
          $pull: {
            friends: req.params.friendId
          },
          new: true
        });

        if (!user) {
          return res.status(404).json({
            message: `No user found with id: '${req.params.userId}'!` 
          });
        }

        res.json(user);
        
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    //TODO: **BONUS**: Remove a user's associated thoughts when deleted.
}