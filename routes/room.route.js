const express = require('express');
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require('../controllers/room.controller');

const { authenticate, authorize } = require('../middlewares/auth.middleware');
const uploadCloud = require('../middlewares/upload.middleware');

const roomRouter = express.Router();

roomRouter.get('/', getAllRooms);
roomRouter.get('/:id', getRoomById);

// Chỉ ADMIN mới được tạo/sửa phòng kèm upload ảnh
roomRouter.post('/', authenticate, authorize(['ADMIN']), uploadCloud.single('image'), createRoom);
roomRouter.put('/:id', authenticate, authorize(['ADMIN']), uploadCloud.single('image'), updateRoom);

roomRouter.delete('/:id', authenticate, authorize(['ADMIN']), deleteRoom);

module.exports = roomRouter;