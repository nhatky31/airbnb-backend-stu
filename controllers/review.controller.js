const { Review, Room, User } = require('../models');

// 1. Đăng bình luận mới (yêu cầu đăng nhập)
const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId, content } = req.body;

    if (!roomId || !content || !content.trim()) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ roomId và nội dung bình luận!" });
    }

    // Kiểm tra phòng có tồn tại không
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Phòng không tồn tại!" });
    }

    const newReview = await Review.create({
      userId,
      roomId,
      content: content.trim(),
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo bình luận", error: error.message });
  }
};

// 2. Lấy danh sách bình luận theo phòng (công khai)
const getReviewsByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const reviews = await Review.findAll({
      where: { roomId },
      include: [
        {
          model: User,
          as: 'user', // Khớp chính xác với models/review.js
          attributes: ['id', 'name', 'avatar'], // Không trả về password
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      totalReviews: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách bình luận", error: error.message });
  }
};

// 3. Xóa bình luận (chỉ chủ bình luận hoặc ADMIN)
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy bình luận!" });
    }

    const isAdmin = req.user.type && req.user.type.toUpperCase() === 'ADMIN';
    if (review.userId !== req.user.id && !isAdmin) {
      return res.status(403).json({ message: "Bạn không có quyền xóa bình luận của người khác!" });
    }

    await review.destroy();
    res.status(200).json({ message: "Xóa bình luận thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi xóa bình luận", error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByRoom,
  deleteReview,
};