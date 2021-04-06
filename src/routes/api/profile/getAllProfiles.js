const express = require('express');

const router = express.Router();

const Profile = require('../../../models/Profile');

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
