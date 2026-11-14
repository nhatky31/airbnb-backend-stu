const jwt = require('jsonwebtoken');

// Trạm gác 1: Kiểm tra xem đã Đăng nhập chưa (Có thẻ Token hợp lệ không)
const authenticate = (req, res, next) => {
  try {
    // Lấy token từ Headers của request (thường nằm ở biến Authorization)
    const token = req.header('token'); 
    
    if (!token) {
      return res.status(401).json({ message: "Vui lòng đăng nhập để thực hiện chức năng này!" });
    }

    // Giải mã token bằng Secret Key lúc nãy
    const secretKey = "Ky_Airbnb_Secret_Key";
    const decoded = jwt.verify(token, secretKey);

    // Gắn thông tin user giải mã được vào request để các hàm phía sau sử dụng
    req.user = decoded; 
    
    next(); // Cho phép đi tiếp vào Controller
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};

// Trạm gác 2: Kiểm tra xem có phải ADMIN không
// Lưu ý: Hàm này phải đi sau hàm authenticate
const authorize = (arrType) => {
  return (req, res, next) => {
    const { type } = req.user; // Lấy type (hoặc role) từ token đã giải mã ở trên
    
    // Kiểm tra xem type của user có nằm trong danh sách được phép (arrType) không
    if (arrType.includes(type)) {
      next(); // Là ADMIN -> Cho đi tiếp
    } else {
      res.status(403).json({ message: "Bạn không có quyền thực hiện hành động này!" });
    }
  };
};

module.exports = { authenticate, authorize };