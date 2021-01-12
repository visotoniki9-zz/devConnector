const express = require('express');

const router = express.Router();

router.use('/me', require('./profile/getCurrentUserProfile'));
router.use('/', require('./profile/createOrUpdateProfile'));
router.use('/', require('./profile/getAllProfiles'));
router.use('/user', require('./profile/getProfileByUserId'));
router.use('/experience', require('./profile/addExperience'));
router.use('/experience', require('./profile/deleteExperience'));
router.use('/education', require('./profile/addEducation'));
router.use('/education', require('./profile/deleteEducation'));

module.exports = router;
