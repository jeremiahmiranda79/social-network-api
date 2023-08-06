const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateSingleUser,
  deleteSingleUser,

  // addAssignment,
  // removeAssignment,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createNewUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

// /api/students/:studentId/assignments
// router.route('/:userId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;