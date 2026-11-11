const { Ticket } = require('../models');

const createBooking = async (req, res) => {
  try {
    const { userId, roomId, checkIn, checkOut } = req.body;
    
    const newBooking = await Ticket.create({ 
      userId, 
      roomId, 
      checkIn, 
      checkOut 
    });
    
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo vé đặt phòng", error });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Ticket.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đặt phòng", error });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Ticket.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy thông tin đặt phòng" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm vé đặt phòng", error });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body;
    
    const booking = await Ticket.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy vé để cập nhật" });
    }
    
    await booking.update({ checkIn, checkOut });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật đặt phòng", error });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Ticket.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy vé để xóa" });
    }
    
    await booking.destroy();
    res.status(200).json({ message: "Hủy đặt phòng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi hủy đặt phòng", error });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
};