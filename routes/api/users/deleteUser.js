const express = require('express');

const router = express.Router();

const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

// @route DELETE api/user
// @desc Delete profile, user and posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
