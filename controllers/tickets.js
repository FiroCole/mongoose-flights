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
  ticket.push(req.body.flightId);
  await flight.save();
  res.redirect(`flights/${flight._id}`);
}

async function newTicket(req, res) {
    const flightId = req.params.id; 
    res.render('tickets/new', { title: 'Add Ticket', flightId, errorMsg: '' });
  }
  

async function create(req, res) {
    try {
       let ticket = new Ticket(req.body);
        ticket.flight = req.params.id;
        await ticket.save();
        res.redirect(`/flights/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/flights/${req.params.id}/tickets/new`);
    }
}
