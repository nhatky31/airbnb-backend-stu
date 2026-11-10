const express = require('express');
const db = require('./models'); // Import models để Sequelize nhận diện

const app = express();
app.use(express.json()); // Để đọc được dữ liệu JSON từ Postman gửi lên

// Lệnh đồng bộ cấu trúc Models xuống MySQL (Đã đổi thành alter: true)
db.sequelize.sync({
  alter: true
})
  .then(() => {
    console.log("Đã đồng bộ Database và thiết lập Khóa Ngoại thành công!");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server Backend đang chạy tại cổng ${port}`);
    });
  })
  .catch(err => {
    console.error("Lỗi đồng bộ Database:", err);
  });