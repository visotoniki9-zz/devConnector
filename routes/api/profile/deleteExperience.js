const express = require('express');

const router = express.Router();

const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');

// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from profile experience field
// @access Private
router.delete(
  '/',
  auth,
  async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      const removeIndex = foundProfile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      foundProfile.experience.splice(removeIndex, 1);
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
