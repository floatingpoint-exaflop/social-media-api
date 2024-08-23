const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require ('../../controllers/userController');

// /api/users route (get users or post a new user)
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId (get a specific user, or update one, or delete one)
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId (for a specific user, add or remove another user as a friend)
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;