const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'AirBnB Backend API',
    version: '1.0.0',
    description: 'Tài liệu API hệ thống đặt phòng AirBnB (Node.js, Express, Sequelize, TiDB, Cloudinary)',
  },
  servers: [
    {
      url: 'https://airbnb-backend-stu-1.onrender.com/api',
      description: 'Render Production Server',
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      TokenAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'token',
        description: 'Dán chuỗi JWT token nhận được từ API /auth/login vào đây',
      },
    },
  },
  tags: [
    { name: 'Auth', description: 'Đăng ký & Đăng nhập' },
    { name: 'Rooms', description: 'Quản lý & Tìm kiếm phòng' },
    { name: 'Bookings', description: 'Đặt phòng & Lịch sử cá nhân' },
    { name: 'Reviews', description: 'Bình luận phòng' },
    { name: 'Locations', description: 'Quản lý địa điểm' },
    { name: 'Users', description: 'Quản lý người dùng' },
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Đăng ký tài khoản mới',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Nguyễn Văn A' },
                  email: { type: 'string', example: 'user2026@gmail.com' },
                  password: { type: 'string', example: 'password123' },
                  phone: { type: 'string', example: '0901234567' },
                  birthday: { type: 'string', example: '2004-12-31' },
                  gender: { type: 'boolean', example: true },
                  type: { type: 'string', example: 'USER' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Đăng ký thành công' },
          500: { description: 'Lỗi server' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Đăng nhập lấy JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'admin2026@gmail.com' },
                  password: { type: 'string', example: 'password123' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Đăng nhập thành công, trả về token' },
          400: { description: 'Sai mật khẩu' },
          404: { description: 'Tài khoản không tồn tại' },
        },
      },
    },
    '/rooms': {
      get: {
        tags: ['Rooms'],
        summary: 'Lấy danh sách phòng (có phân trang & lọc)',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'locationId', in: 'query', schema: { type: 'integer' } },
          { name: 'keyword', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'Danh sách phòng' },
        },
      },
      post: {
        tags: ['Rooms'],
        summary: 'Tạo phòng mới (Admin + Upload ảnh Cloudinary)',
        security: [{ TokenAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Villa Đà Lạt View Đồi Thông' },
                  guests: { type: 'integer', example: 4 },
                  bedRoom: { type: 'integer', example: 2 },
                  bath: { type: 'integer', example: 2 },
                  description: { type: 'string', example: 'Phòng rộng rãi, thoáng mát' },
                  price: { type: 'integer', example: 1500000 },
                  locationId: { type: 'integer', example: 1 },
                  image: { type: 'string', format: 'binary', description: 'File ảnh upload lên Cloudinary' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Tạo phòng thành công' },
          401: { description: 'Thiếu hoặc sai token' },
          403: { description: 'Không có quyền Admin' },
        },
      },
    },
    '/bookings': {
      post: {
        tags: ['Bookings'],
        summary: 'Đặt phòng (kiểm tra trùng lịch)',
        security: [{ TokenAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['roomId', 'checkIn', 'checkOut'],
                properties: {
                  roomId: { type: 'integer', example: 30001 },
                  checkIn: { type: 'string', example: '2026-12-20' },
                  checkOut: { type: 'string', example: '2026-12-22' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Đặt phòng thành công' },
          409: { description: 'Phòng đã có người đặt trong khoảng thời gian này' },
        },
      },
    },
    '/bookings/my-bookings': {
      get: {
        tags: ['Bookings'],
        summary: 'Xem lịch sử đặt phòng của tài khoản đang đăng nhập',
        security: [{ TokenAuth: [] }],
        responses: {
          200: { description: 'Danh sách đơn đặt phòng cá nhân' },
          401: { description: 'Chưa đăng nhập' },
        },
      },
    },
    '/reviews': {
      post: {
        tags: ['Reviews'],
        summary: 'Đăng bình luận mới cho phòng',
        security: [{ TokenAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['roomId', 'content'],
                properties: {
                  roomId: { type: 'integer', example: 30001 },
                  content: { type: 'string', example: 'Phòng sạch đẹp, view rất chill!' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Tạo bình luận thành công' },
        },
      },
    },
    '/reviews/room/{roomId}': {
      get: {
        tags: ['Reviews'],
        summary: 'Lấy danh sách bình luận theo mã phòng',
        parameters: [
          {
            name: 'roomId',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 30001 },
          },
        ],
        responses: {
          200: { description: 'Danh sách bình luận kèm tên và avatar người đăng' },
        },
      },
    },
    '/reviews/{id}': {
      delete: {
        tags: ['Reviews'],
        summary: 'Xóa bình luận (Chủ bình luận hoặc Admin)',
        security: [{ TokenAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'Xóa thành công' },
          403: { description: 'Không có quyền xóa bình luận của người khác' },
        },
      },
    },
  },
};

module.exports = swaggerDocument;