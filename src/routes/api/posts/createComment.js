const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../../middleware/auth');
const Post = require('../../../models/Post');
const User = require('../../../models/User');

const router = express.Router();

// @route POST api/posts/comment/:id
// @desc Comment on a post
// @access Private
router.post(
  '/:id',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      return res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  },
);

module.exports = router;
