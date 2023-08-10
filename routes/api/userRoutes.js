const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend, 
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createNewUser);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateSingleUser)
  .delete(deleteSingleUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;