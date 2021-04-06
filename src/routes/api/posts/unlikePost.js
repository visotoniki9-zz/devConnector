const express = require('express');

const auth = require('../../../middleware/auth');
const Post = require('../../../models/Post');

const router = express.Router();

// @route DELETE api/posts/unlike/:id
// @desc unlike post
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
      if (post.likes.filter(
        (like) => like.user.toString() === req.user.id,
      ).length === 0) {
        return res.status(400).json({ msg: 'Not yet liked' });
      }
      const removeIndex = post.likes.map(
        (like) => like.user.toString(),
      ).indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      await post.save();
      return res.json(post.likes);
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
