const express = require('express');

const router = express.Router();

const Profile = require('../../../models/Profile');

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.user_id })
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400)
        .json({ msg: 'Profile not found' });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400)
        .json({ msg: 'Profile not found' });
    }
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
