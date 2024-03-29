const express = require('express');

const router = express.Router();

const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');

// @route DELETE api/profile/education/:ed_id
// @desc delete education from profile education field
// @access Private
router.delete(
  '/:ed_id',
  auth,
  async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      const removeIndex = foundProfile.education
        .map((item) => item.id)
        .indexOf(req.params.ed_id);
      foundProfile.education.splice(removeIndex, 1);
      await foundProfile.save();
      res.json(foundProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
