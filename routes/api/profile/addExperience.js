const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');

// @route PUT api/profile/experience
// @desc add experiencese in profile experience field
// @access Private
router.put(
  '/',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check('from', 'From date is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newExp = req.body;

    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.experience.unshift(newExp);
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
