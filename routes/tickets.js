const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// This router is mounted to a "starts with" path of '/'

// GET /tickets/new (new functionality)
router.get('/tickets/new', ticketsCtrl.new);

router.post('/flights/:id/tickets', ticketsCtrl.create);

module.exports = router;