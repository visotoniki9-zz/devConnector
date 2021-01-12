const express = require('express');

const router = express.Router();

router.use('/', require('./auth/getUser'));
router.use('/', require('./auth/loginUser'));

module.exports = router;
