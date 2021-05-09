const Router = require('express');
const router = new Router();
const userController = require('./userController');

router.get('/ok', userController.ok);

// users/all?email=maifl
router.get('/:email', userController.getUserByEmail);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

router.get('/posts/:id', userController.getUserPosts);
router.delete('/posts/:id', userController.deleteUserPosts);

module.exports = router;
