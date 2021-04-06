const express = require('express');

const auth = require('../../../middleware/auth');
const Post = require('../../../models/Post');

const router = express.Router();

// @route DELETE api/posts/comment/:id
// @desc Delete comment
// @access Private
router.delete(
  '/:post_id/:comment_id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }

      const comment = post.comments.find(
        (com) => com.id === req.params.comment_id,
      );

      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User no authorized' });
      }

      const removeIndex = post.comments
        .map((com) => com.id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      await post.save();
      return res.json(post.comments);
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
