const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// [POST] ĐĂNG KÝ TÀI KHOẢN
const register = async (req, res) => {
  try {
    // 1. Lấy thông tin từ người dùng gửi lên
    const { name, email, password, phone, birthday, gender, role, type } = req.body;

    // 2. Tạo chuỗi muối (salt) và băm mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // 3. Lưu vào Database với mật khẩu đã được mã hóa
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Tuyệt đối không lưu mật khẩu gốc
      phone,
      birthday,
      gender,
      role,
      type
    });

    res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng ký", error });
  }
};

// [POST] ĐĂNG NHẬP
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Tìm người dùng theo email trong DB
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại!" });
    }

    // 2. Kiểm tra mật khẩu (so sánh mk gốc và mk đã băm trong DB)
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không chính xác!" });
    }

    // 3. Tạo mã Token (Thẻ thông hành)
    // Payload là những thông tin mình muốn đính kèm vào thẻ (không nên để password vào đây)
    const payload = {
      id: user.id,
      email: user.email,
      type: user.type
    };
    
    const secretKey = "Ky_Airbnb_Secret_Key"; // Chìa khóa bí mật để ký token
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Thẻ này có hạn 1 tiếng

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng nhập", error });
  }
};

module.exports = { register, login };