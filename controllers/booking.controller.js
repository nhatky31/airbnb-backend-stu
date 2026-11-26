const { Op } = require('sequelize');
const { Booking, Room } = require('../models');

// 1. Tạo đơn đặt phòng (lấy userId từ Token + chặn trùng lịch)
const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId, checkIn, checkOut } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!roomId || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ roomId, checkIn và checkOut!" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ message: "Định dạng ngày checkIn/checkOut không hợp lệ!" });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: "Ngày trả phòng (checkOut) phải sau ngày nhận phòng (checkIn)!" });
    }

    // Kiểm tra phòng có tồn tại không
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Phòng không tồn tại!" });
    }

    // Kiểm tra trùng lịch trên cùng 1 phòng
    const existingBooking = await Booking.findOne({
      where: {
        roomId,
        checkIn: { [Op.lt]: checkOutDate },
        checkOut: { [Op.gt]: checkInDate },
      },
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "Phòng đã có người đặt trong khoảng thời gian này!",
        conflict: {
          checkIn: existingBooking.checkIn,
          checkOut: existingBooking.checkOut,
        },
      });
    }

    // Hợp lệ -> Lưu đơn mới
    const newBooking = await Booking.create({
      userId,
      roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi đặt phòng", error: error.message });
  }
};

// 2. Lấy lịch sử đặt phòng của chính user đang đăng nhập
const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: Room }], // Kèm thông tin chi tiết phòng (tên, ảnh, giá...)
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      total: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy lịch sử đặt phòng", error: error.message });
  }
};

// 3. Lấy toàn bộ danh sách booking
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đặt phòng", error: error.message });
  }
};

// 4. Lấy chi tiết 1 booking theo ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đơn đặt phòng!" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết đặt phòng", error: error.message });
  }
};

// 5. Cập nhật booking (chỉ chủ đơn hoặc ADMIN được sửa)
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đơn đặt phòng!" });
    }

    const isAdmin = req.user.type && req.user.type.toUpperCase() === 'ADMIN';
    if (booking.userId !== req.user.id && !isAdmin) {
      return res.status(403).json({ message: "Bạn không có quyền sửa đơn của người khác!" });
    }

    await booking.update(req.body);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật đặt phòng", error: error.message });
  }
};

// 6. Hủy booking (chỉ chủ đơn hoặc ADMIN được hủy)
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đơn đặt phòng!" });
    }

    const isAdmin = req.user.type && req.user.type.toUpperCase() === 'ADMIN';
    if (booking.userId !== req.user.id && !isAdmin) {
      return res.status(403).json({ message: "Bạn không có quyền hủy đơn của người khác!" });
    }

    await booking.destroy();
    res.status(200).json({ message: "Hủy đặt phòng thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi hủy đặt phòng", error: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};