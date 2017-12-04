const express = require('express');
const router = express.Router();
const authenticationController = require('../lib/instances/authenticationController');

router.post('/authenticate', authenticationController.authentication);
router.all('/authenticate', (req, res, next) => {
  res.status(405).send('Only post');
});

module.exports = router;
