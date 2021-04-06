const express = require('express');

const auth = require('../../../middleware/auth');
const Post = require('../../../models/Post');

const router = express.Router();

// @route DELETE api/posts/:id
// @desc Delete post by ID
// @access Private
router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      await post.remove();
      return res.json({ msg: 'Post removed' });
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
