const express = require('express');
const {
  createReview,
  getReviewsByRoom,
  deleteReview,
} = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const reviewRouter = express.Router();

reviewRouter.post('/', authenticate, createReview);
reviewRouter.get('/room/:roomId', getReviewsByRoom);
reviewRouter.delete('/:id', authenticate, deleteReview);

module.exports = reviewRouter;