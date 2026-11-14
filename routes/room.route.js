const express = require('express');
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require('../controllers/room.controller');

const { authenticate , authorize } = require('../middlewares/auth.middleware');

const roomRouter = express.Router();




roomRouter.post('/', authenticate,authorize(['admin']), createRoom); // POST /api/rooms
roomRouter.get('/', getAllRooms); // GET /api/rooms
roomRouter.get('/:id', getRoomById); // GET /api/rooms/:id
roomRouter.put('/:id', authenticate, authorize(['admin']), updateRoom); // PUT /api/rooms/:id
roomRouter.delete('/:id',authenticate,authorize(['ADMIN']), deleteRoom); // DELETE /api/rooms/:id

module.exports = roomRouter;