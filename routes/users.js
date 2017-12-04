const express = require('express');
const router = express.Router();
const usersController = require('../lib/instances/usersController');

router.get('/users', usersController.getAll);
router.post('/users', usersController.create);
router.all('/users', (req, res, next) => {
  res.status(405).send('Method Not Allowed');
});
router.get('/users/:id(\\d+)', usersController.getById);
router.patch('/users/:id(\\d+)', usersController.update);
router.all('/users/:id(\\d+)', (req, res, next) => {
  res.status(405).send('Method Not Allowed');
});

module.exports = router;
