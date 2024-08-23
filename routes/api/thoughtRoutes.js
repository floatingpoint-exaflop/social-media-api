const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require ('../../controllers/thoughtController');

// /api/thoughts route (get thoughts or post a new thought)
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId (get a specific thought, or update one, or delete one)
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions (create reaction for a single thought's reactions array, or delete a reaction from a thought)
router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;