const express = require('express');

const router = express.Router();
// @route GET api/auth
// @desc return user by id
// @access Public

// @route POST api/auth
// @desc Login user
// @access Public/

router.use('/', require('./auth/getUser'));
router.use('/', require('./auth/loginUser'));

module.exports = router;
