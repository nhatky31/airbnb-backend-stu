const express = require('express');
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require('../controllers/room.controller');

const roomRouter = express.Router();

roomRouter.post('/', createRoom); // POST /api/rooms
roomRouter.get('/', getAllRooms); // GET /api/rooms
roomRouter.get('/:id', getRoomById); // GET /api/rooms/:id
roomRouter.put('/:id', updateRoom); // PUT /api/rooms/:id
roomRouter.delete('/:id', deleteRoom); // DELETE /api/rooms/:id

module.exports = roomRouter;