const express = require('express');

const router = express.Router();

// @route GET api/users
// @desc register user
// @access Public

// @route DELETE api/users
// @desc Delete profile, user and posts
// @access Private

router.use('/', require('./users/registerUser'));
router.use('/', require('./users/deleteUser'));

module.exports = router;
