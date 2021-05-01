const Router = require('express');
const router = new Router();
const postController = require('./postController');

router.get('/ok', postController.ok);

// http://localhost:8080/posts/all?page=1&limit=5
router.get('/all', postController.getPostsByParams);

router.post('/add', postController.createPost);

module.exports = router;
