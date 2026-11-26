const express = require('express');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require('../controllers/booking.controller');

const { authenticate } = require('../middlewares/auth.middleware');

const bookingRouter = express.Router();

bookingRouter.post('/', authenticate, createBooking);
bookingRouter.get('/my-bookings', authenticate, getMyBookings); // PHẢI nằm trên /:id
bookingRouter.get('/', getAllBookings);
bookingRouter.get('/:id', getBookingById);
bookingRouter.put('/:id', authenticate, updateBooking);
bookingRouter.delete('/:id', authenticate, deleteBooking);

module.exports = bookingRouter;