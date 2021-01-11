const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
// const User = require('../../models/User');

const router = express.Router();

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post(
  '/',
  auth,
  check('company', 'Company is required').notEmpty().isLength({ max: 128 }),
  check('website', 'Website is required').notEmpty().isLength({ max: 128 }),
  check('location', 'Location is required').notEmpty().isLength({ max: 128 }),
  check('status', 'Status is required').notEmpty().isLength({ max: 128 }),
  check('skills', 'Skills are required').notEmpty().isLength({ max: 512 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    const profileFields = req.body;
    profileFields.skills = profileFields.skills
      .split(',')
      .map((skill) => skill.trim());

    profileFields.user = req.user.id;

    try {
      // Check if profile exists
      const foundProfile = await Profile.findOne({ user: req.user.id });
      if (foundProfile) {
        // Update profile
        const updatedProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        );
        return res.json(updatedProfile);
      }
      // Create new profile
      const newProfile = Profile(profileFields);
      await newProfile.save();
      return res.json(newProfile);
      // Catch errors
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server Error');
    }
  },
);

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

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
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
