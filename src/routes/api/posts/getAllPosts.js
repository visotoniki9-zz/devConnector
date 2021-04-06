const express = require('express');

const auth = require('../../../middleware/auth');
const Post = require('../../../models/Post');

const router = express.Router();

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json(posts);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server error');
    }
  },
);

module.exports = router;
