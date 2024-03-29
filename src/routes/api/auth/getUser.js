const express = require('express');

const router = express.Router();

const auth = require('../../../middleware/auth');
const User = require('../../../models/User');

// @route GET api/auth
// @desc return user by id
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
