const express = require('express');

const auth = require('../../../middleware/auth');
const Post = require('../../../models/Post');

const router = express.Router();

// @route GET api/posts/:id
// @desc Get post by ID
// @access Private
router.get(
  '/:id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post no found' });
      }
      return res.status(500).send('Server error');
    }
  },
);

module.exports = router;
