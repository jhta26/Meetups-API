const express = require('express')
const router = express.Router()
const meetupsController = require('../lib/instances/meetupsController')

router.post('/users/:user_id(\\d+)/meetups', meetupsController.postByUsersId)
router.get('/users/:user_id(\\d+)/meetups', meetupsController.findByUsersId)
router.all('/users/:user_id(\\d+)/meetups', (req, res, next) => {
    res.status(405).send('Method Not Allowed');
});

router.patch('/meetups/:id(\\d+)', meetupsController.update)
router.delete('/meetups/:id(\\d+)', meetupsController.delete)
router.all('/meetups/:id(\\d+)', (req, res, next) => {
    res.status(405).send('Method Not Allowed');
});

module.exports = router;
