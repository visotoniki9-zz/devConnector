const express = require('express');

const router = express.Router();

router.use('/', require('./users/registerUser'));
router.use('/', require('./users/deleteUser'));

module.exports = router;
