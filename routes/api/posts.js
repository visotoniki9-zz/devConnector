const express = require('express');

const router = express.Router();

router.use('/', require('./posts/createPost'));
router.use('/', require('./posts/getAllPosts'));
router.use('/', require('./posts/getPostById'));

module.exports = router;
