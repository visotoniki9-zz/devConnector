const express = require('express');

const router = express.Router();

router.use('/', require('./posts/createPost'));
router.use('/', require('./posts/getAllPosts'));
router.use('/', require('./posts/getPostById'));
router.use('/', require('./posts/deletePost'));

module.exports = router;
