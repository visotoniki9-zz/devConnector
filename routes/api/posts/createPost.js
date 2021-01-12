const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../../middleware/auth');
const Post = require('../../../models/Post');
const User = require('../../../models/User');

const router = express.Router();

// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  },
);

module.exports = router;
