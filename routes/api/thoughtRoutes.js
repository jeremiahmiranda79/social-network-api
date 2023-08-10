const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateSingleThought,
  deleteSingleThought,
  createNewReaction,
  deleteReaction

} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(createNewThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateSingleThought)
  .delete(deleteSingleThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createNewReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;