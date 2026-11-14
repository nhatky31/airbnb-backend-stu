const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Cấu hình chìa khóa kết nối với Cloudinary của bạn
cloudinary.config({ 
  cloud_name: 'oy7juu7t', 
  api_key: '936848531128289', 
  api_secret: 'PrXBNwBRWUQfpWAx1ZqZ7fHmEbU' 
});

// 2. Cấu hình kho lưu trữ trên mây
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'airbnb_locations', // Tên thư mục nó sẽ tự tạo trên Cloudinary để chứa ảnh
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp'] // Chỉ cho phép tải ảnh
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;