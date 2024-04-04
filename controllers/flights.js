const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    show,
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
  
    res.redirect('/flights');
  } catch (err) {
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}


  async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        const tickets = await Ticket.find({flight: flight._id});
        res.render('flights/show', { title: 'Flight Detail', flight, tickets });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

 async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', { title: 'All Flights', flights });
  }
  
