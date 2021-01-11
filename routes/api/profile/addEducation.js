const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');

router.put(
  '/',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldOfStudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required').notEmpty(),
  check('to', 'To date is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newEducation = req.body;

    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.education.unshift(newEducation);
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

);

module.exports = router;
