const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route GET api/users
// @desc register user
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

    try {
      // See if user exists
      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: 'User already exists' }] });
      }
      // Get new users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // New user
      const newUser = new User({
        name, email, avatar, password,
      });
        // Encrypt password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      // Save new user to db
      await newUser.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: newUser.id,
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
