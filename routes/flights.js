var express = require('express');
var router = express.Router();

// Require the controller that exports To-Do CRUD functions
var flightsCtrl = require('../controllers/flights');

// All actual paths start with "/flights"

/* GET /flights/new  */
router.get('/new', flightsCtrl.new);

// get /flight/:id
router.get("/:id", flightsCtrl.show)

// GET /flights
router.get('/', flightsCtrl.index);

// Post /flight
router.post('/', flightsCtrl.create);


module.exports = router;
