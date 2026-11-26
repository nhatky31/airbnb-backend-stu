require('dotenv').config();
const express = require('express');
const db = require('./models'); // Import models để Sequelize nhận diện
const rootRouter = require('./routes'); // Import rootRouter từ routes/index.js
const cors = require('cors');

const app = express();
app.use(express.json()); // Để đọc được dữ liệu JSON từ Postman gửi lên

// Mở CORS cho phép Frontend gọi API và gửi kèm header 'token'
app.use(cors({
  origin: '*', // Lúc hoàn thiện Frontend deploy xong có thể đổi thành domain thật (vd: 'https://ten-web.vercel.app')
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}));


app.use('/api', rootRouter); // Tất cả các route sẽ bắt đầu bằng /api

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