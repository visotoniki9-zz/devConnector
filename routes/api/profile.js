const express = require('express');

const router = express.Router();

// @route GET api/profile/me
// @desc Get current users profile
// @access Private

// @route POST api/profile
// @desc Create or update user profile
// @access Private

// @route GET api/profile
// @desc Get all profiles
// @access Public

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public

// @route PUT api/profile/experience
// @desc add experiencese in profile experience field
// @access Private

// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from profile experience field
// @access Private

// @route PUT api/profile/education
// @desc add education in profile education field
// @access Private

// @route DELETE api/profile/education/:ed_id
// @desc delete education from profile education field
// @access Private

router.use('/me', require('./profile/getCurrentUserProfile'));
router.use('/', require('./profile/createOrUpdateProfile'));
router.use('/', require('./profile/getAllProfiles'));
router.use('/user/:user_id', require('./profile/getProfileByUserId'));
router.use('/experience', require('./profile/addExperience'));
router.use('/experience/:exp_id', require('./profile/deleteExperience'));
router.use('/education', require('./profile/addEducation'));
router.use('/education/:ed_id', require('./profile/deleteEducation'));

module.exports = router;
