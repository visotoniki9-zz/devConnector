const express = require('express');

const router = express.Router();

// @route GET api/posts
// @desc  Test route
// @access Public
router.use('/', require('./posts/createPost'));
router.use('/', require('./posts/getAllPosts'));

module.exports = router;
