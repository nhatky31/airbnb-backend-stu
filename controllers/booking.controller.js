const { Booking } = require('../models'); // Đảm bảo import đúng tên Model của bạn (Booking hoặc Ticket)

const createBooking = async (req, res) => {
  try {
    // Các trường dữ liệu cơ bản khi đặt phòng (bạn điều chỉnh lại cho khớp Model nhé)
    const { user_id, room_id, checkIn, checkOut, guestCount } = req.body;
    
    const newBooking = await Booking.create({ 
      user_id, 
      room_id, 
      checkIn, 
      checkOut, 
      guestCount 
    });
    
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo vé đặt phòng", error });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đặt phòng", error });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
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
    const { checkIn, checkOut, guestCount } = req.body;
    
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy vé để cập nhật" });
    }
    
    await booking.update({ checkIn, checkOut, guestCount });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật đặt phòng", error });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
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