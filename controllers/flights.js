const Flight = require('../models/flight');

module.exports = {
    index,
    // show,
    create,
    // update,
    new: newFlight,
    // deleteOne,
    // deleteAll,
  };

function newFlight(req,res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  res.render('flights/new', { departsDate, title: 'Add Flight', errorMsg: ''  });
}



async function create(req,res) {
  try {
    await Flight.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect('/flights');
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

/*
function show(req, res) {
    res.render('flights/show', {
      flight: Flight.getOne(req.params.id),
      title: 'Flight Details'
    });
  }
  */

 async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
  }
  
