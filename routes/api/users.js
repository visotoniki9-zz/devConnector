const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route GET api/profile
// @desc  Test route
// @access Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // TODO See if user exists
    // TODO Get users gravatar
    // TODO Encrypt password
    // TODO Return jsonwebtoken

    res.send('User router');
    return res.status(200);
  },
);

module.exports = router;
