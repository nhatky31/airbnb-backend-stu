const express = require('express');
const db = require('./models'); // Import models để Sequelize nhận diện

const app = express();
app.use(express.json()); // Để đọc được dữ liệu JSON từ Postman gửi lên

// Lệnh đồng bộ cấu trúc Models xuống MySQL
db.sequelize.sync({force: true })
  .then(() => {
    console.log("Đã đồng bộ Database và thiết lập Khóa Ngoại thành công!");
    
    app.listen(3000, () => {
      console.log('Server Backend đang chạy tại cổng 3000');
    });
  })
  .catch(err => {
    console.error("Lỗi đồng bộ Database:", err);
  });