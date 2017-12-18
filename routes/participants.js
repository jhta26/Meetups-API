const express = require('express');
const router = express.Router();
const participantsController = require('../lib/instances/participantsController');

router.post(
  '/users/:user_id(\\d+)/participants',
  participantsController.postByUsersId
);
router.get(
  '/users/:user_id(\\d+)/participants',
  participantsController.findByUsersId
);
router.all('/users/:user_id(\\d+)/participants', (req, res, next) => {
  res.status(405).send('Method Not Allowed');
});
router.get(
  '/meetups/:meetup_id(\\d+)/participants',
  participantsController.findByMeetupsId
);
router.patch('/participants/:id(\\d+)', participantsController.update);
router.delete('/participants/:id(\\d+)', participantsController.delete);
router.all('/participants/:id(\\d+)', (req, res, next) => {
  res.status(405).send('Method Not Allowed');
});

module.exports = router;
