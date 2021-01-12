const express = require('express');

const router = express.Router();

router.use('/', require('./posts/createPost'));
router.use('/', require('./posts/getAllPosts'));
router.use('/', require('./posts/getPostById'));
router.use('/', require('./posts/deletePost'));
router.use('/like', require('./posts/likePost'));
router.use('/unlike', require('./posts/unlikePost'));
router.use('/comment', require('./posts/createComment'));
router.use('/comment', require('./posts/deleteComment'));

module.exports = router;
