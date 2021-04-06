const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

const User = require('../../../models/User');

const router = express.Router();
// @route POST api/auth
// @desc Login user
// @access Public/
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        return res
          .status(400)
          .json({ erros: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, foundUser.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ erros: [{ msg: 'Invalid credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: foundUser.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  },
);

module.exports = router;
