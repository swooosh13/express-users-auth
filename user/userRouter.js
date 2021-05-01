const Router = require('express');
const router = new Router();
const userController = require('./userController');

router.get('/ok', userController.ok);
router.get('/:id', userController.getUser);
router.get('/', userController.getUsers);

router.get('/posts/:id', userController.getUserPosts);
router.delete('/posts/:id', userController.deleteUserPosts);

module.exports = router;
