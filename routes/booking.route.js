const express = require('express');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} = require('../controllers/booking.controller');

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking); // POST /api/bookings
bookingRouter.get('/', getAllBookings); // GET /api/bookings
bookingRouter.get('/:id', getBookingById); // GET /api/bookings/:id
bookingRouter.put('/:id', updateBooking); // PUT /api/bookings/:id
bookingRouter.delete('/:id', deleteBooking); // DELETE /api/bookings/:id

module.exports = bookingRouter;