const express = require('express');
const userRouter = require('./user.route');
const locationRouter = require('./location.route');
const roomRouter = require('./room.route');
const bookingRouter = require('./booking.route');

const rootRouter = express.Router();

rootRouter.use('/users', userRouter); // Tất cả các route liên quan đến người dùng sẽ được định nghĩa trong userRouter
rootRouter.use('/locations', locationRouter); // Tất cả các route liên quan đến địa điểm sẽ được định nghĩa trong locationRouter
rootRouter.use('/rooms', roomRouter); // Tất cả các route liên quan đến phòng sẽ được định nghĩa trong roomRouter
rootRouter.use('/bookings', bookingRouter); // Tất cả các route liên quan đến đặt phòng sẽ được định nghĩa trong bookingRouter

module.exports = rootRouter;