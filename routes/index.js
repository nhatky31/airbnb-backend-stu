const express = require('express');
const userRouter = require('./user.route');

const rootRouter = express.Router();

rootRouter.use('/users', userRouter); // Tất cả các route liên quan đến người dùng sẽ được định nghĩa trong userRouter

module.exports = rootRouter;