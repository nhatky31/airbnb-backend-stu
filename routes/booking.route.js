const express = require('express');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} = require('../controllers/booking.controller');

const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/auth.middleware');

const bookingRouter = express.Router();

bookingRouter.post('/', authenticate,authorize(['ADMIN']), createBooking); // POST /api/bookings
bookingRouter.get('/', getAllBookings); // GET /api/bookings
bookingRouter.get('/:id', getBookingById); // GET /api/bookings/:id
bookingRouter.put('/:id', authenticate, updateBooking); // PUT /api/bookings/:id
bookingRouter.delete('/:id', authenticate, deleteBooking); // DELETE /api/bookings/:id

module.exports = bookingRouter;