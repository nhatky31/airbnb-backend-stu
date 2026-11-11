const express = require('express');
const userRouter = require('./user.route');
const locationRouter = require('./location.route');

const rootRouter = express.Router();

rootRouter.use('/users', userRouter); // Tất cả các route liên quan đến người dùng sẽ được định nghĩa trong userRouter
rootRouter.use('/locations', locationRouter); // Tất cả các route liên quan đến địa điểm sẽ được định nghĩa trong locationRouter

module.exports = rootRouter;