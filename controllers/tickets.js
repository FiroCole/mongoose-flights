const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create,
  addToFlight
};

async function addToFlight(req, res) {
  const flight = await Flight.findById(req.params.id);
  // The cast array holds the ticket's ObjectId (referencing)
  flight.cast.push(req.body.ticketId);
  await flight.save();
  res.redirect(`/flights/${flight._id}`);
}

async function newTicket(req, res) {
  //Sort tickets by their seat
  const tickets = await Ticket.find({}).sort('seat');
  res.render('tickets/new', { title: 'Add ticket', tickets });
}

async function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // Fix by either reformatting to "MM-DD-YYYY" or by 
  // appending a "time" fragment like this... 
  req.body.born += 'T00:00';
  try {
    await Ticket.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/tickets/new');
}