const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');

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

module.exports = router;
