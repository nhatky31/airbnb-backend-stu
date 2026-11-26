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
    { name: 'Locations', description: 'Quản lý địa điểm' },
    { name: 'Bookings', description: 'Đặt phòng & Lịch sử cá nhân' },
    { name: 'Reviews', description: 'Bình luận phòng' },
    { name: 'Users', description: 'Quản lý người dùng' },
  ],
  paths: {
    // ==================== AUTH ====================
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

    // ==================== ROOMS ====================
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
                  image: { type: 'string', format: 'binary', description: 'File ảnh phòng' },
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
    '/rooms/{id}': {
      get: {
        tags: ['Rooms'],
        summary: 'Lấy chi tiết một phòng theo ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 30001 } },
        ],
        responses: {
          200: { description: 'Thông tin chi tiết phòng' },
          404: { description: 'Không tìm thấy phòng' },
        },
      },
      put: {
        tags: ['Rooms'],
        summary: 'Cập nhật thông tin phòng (Admin + tùy chọn đổi ảnh)',
        security: [{ TokenAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Villa Đà Lạt (Đã cập nhật)' },
                  guests: { type: 'integer', example: 6 },
                  bedRoom: { type: 'integer', example: 3 },
                  bath: { type: 'integer', example: 2 },
                  description: { type: 'string', example: 'Cập nhật mô tả phòng' },
                  price: { type: 'integer', example: 1800000 },
                  locationId: { type: 'integer', example: 1 },
                  image: { type: 'string', format: 'binary', description: 'Ảnh mới (nếu muốn thay đổi)' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Cập nhật phòng thành công' },
          403: { description: 'Không có quyền Admin' },
          404: { description: 'Không tìm thấy phòng' },
        },
      },
      delete: {
        tags: ['Rooms'],
        summary: 'Xóa phòng (Admin)',
        security: [{ TokenAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'Xóa phòng thành công' },
          403: { description: 'Không có quyền Admin' },
          404: { description: 'Không tìm thấy phòng' },
        },
      },
    },

    // ==================== LOCATIONS ====================
    '/locations': {
      get: {
        tags: ['Locations'],
        summary: 'Lấy danh sách tất cả địa điểm',
        responses: {
          200: { description: 'Danh sách địa điểm' },
        },
      },
      post: {
        tags: ['Locations'],
        summary: 'Tạo địa điểm mới (Admin + Upload ảnh Cloudinary)',
        security: [{ TokenAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Hồ Xuân Hương' },
                  province: { type: 'string', example: 'Lâm Đồng' },
                  country: { type: 'string', example: 'Việt Nam' },
                  valueate: { type: 'integer', example: 9 },
                  image: { type: 'string', format: 'binary', description: 'File ảnh địa điểm' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Tạo địa điểm thành công' },
          403: { description: 'Không có quyền Admin' },
        },
      },
    },
    '/locations/{id}': {
      get: {
        tags: ['Locations'],
        summary: 'Lấy chi tiết địa điểm theo ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } },
        ],
        responses: {
          200: { description: 'Chi tiết địa điểm' },
          404: { description: 'Không tìm thấy địa điểm' },
        },
      },
      put: {
        tags: ['Locations'],
        summary: 'Cập nhật địa điểm (Admin)',
        security: [{ TokenAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Đà Lạt Trung Tâm' },
                  province: { type: 'string', example: 'Lâm Đồng' },
                  country: { type: 'string', example: 'Việt Nam' },
                  valueate: { type: 'integer', example: 10 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Cập nhật địa điểm thành công' },
          403: { description: 'Không có quyền Admin' },
        },
      },
      delete: {
        tags: ['Locations'],
        summary: 'Xóa địa điểm (Admin)',
        security: [{ TokenAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'Xóa địa điểm thành công' },
          403: { description: 'Không có quyền Admin' },
        },
      },
    },

    // ==================== BOOKINGS ====================
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

    // ==================== REVIEWS ====================
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
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'Xóa thành công' },
          403: { description: 'Không có quyền xóa bình luận của người khác' },
        },
      },
    },

    // ==================== USERS ====================
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Lấy danh sách người dùng (có phân trang)',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          200: { description: 'Danh sách người dùng' },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Tạo người dùng mới',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Trần Văn B' },
                  email: { type: 'string', example: 'tranb@gmail.com' },
                  password: { type: 'string', example: '123456' },
                  phone: { type: 'string', example: '0909123456' },
                  birthday: { type: 'string', example: '2003-05-15' },
                  gender: { type: 'boolean', example: true },
                  type: { type: 'string', example: 'USER' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Tạo người dùng thành công' },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Lấy thông tin người dùng theo ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'Thông tin người dùng' },
          404: { description: 'Không tìm thấy người dùng' },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Cập nhật thông tin người dùng',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Trần Văn B (Updated)' },
                  phone: { type: 'string', example: '0988777666' },
                  birthday: { type: 'string', example: '2003-05-15' },
                  gender: { type: 'boolean', example: true },
                  address: { type: 'string', example: 'Quận 8, TP.HCM' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Cập nhật thành công' },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Xóa người dùng theo ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'Xóa thành công' },
        },
      },
    },
  },
};

module.exports = swaggerDocument;