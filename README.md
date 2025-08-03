# Website Đặt Lịch Siêu Âm - Phòng Khám Siêu Âm

## Mô Tả

Website đặt lịch khám bệnh online với giao diện đơn giản, dễ sử dụng bằng tiếng Việt. Dự án được phát triển dựa trên các tính năng của EasyAppointments với cải tiến phù hợp cho thị trường Việt Nam.

## Tính Năng Chính

### 🏥 Dịch Vụ Siêu Âm
- **Siêu Âm Tổng Quát**: Siêu âm bụng, tuyến giáp, phần mềm
- **Siêu Âm Sản - Phụ Khoa**: Siêu âm thai, phụ khoa, đo độ mờ da gáy
- **Siêu Âm Tim - Mạch Máu**: Siêu âm tim, Doppler động mạch, tĩnh mạch
- **Siêu Âm Cơ - Xương - Khớp**: Siêu âm khớp, phần mềm cơ
- **Dịch Vụ Kèm Theo**: Khám sức khỏe tổng quát, xét nghiệm
- **Khám Định Kỳ**: Theo dõi thai sản, bệnh mãn tính

### 🔐 Hệ Thống Admin
- **Đăng nhập bảo mật**: Chỉ admin có thể truy cập
- **Tích hợp Google Calendar**: Tự động thêm lịch hẹn
- **Dashboard quản lý**: Thống kê và quản lý lịch hẹn
- **Email thông báo**: Tự động gửi email cho bác sĩ

### 📅 Hệ Thống Đặt Lịch
- **4 Bước Đơn Giản**: Chọn dịch vụ → Chọn thời gian → Nhập thông tin → Xác nhận
- **Lựa Chọn Bác Sĩ**: Mỗi chuyên khoa có đội ngũ bác sĩ chuyên môn
- **Lịch Làm Việc**: 
  - Thứ 2 - Thứ 6: 7:00 - 17:00
  - Thứ 7: 7:00 - 12:00
  - Chủ Nhật: Nghỉ
- **Validation Thông Minh**: Kiểm tra tính hợp lệ của thông tin nhập

### 🎨 Giao Diện Người Dùng
- **Responsive Design**: Tương thích với mọi thiết bị
- **Giao Diện Tiếng Việt**: 100% nội dung bằng tiếng Việt
- **Animation Mượt Mà**: Hiệu ứng chuyển đổi mượt mà
- **Thiết Kế Hiện Đại**: Sử dụng Bootstrap 5 và CSS tùy chỉnh

## Cấu Trúc Dự Án

```
booking_phong_kham/
├── index.html              # Trang chủ
├── assets/
│   ├── css/
│   │   └── style.css       # File CSS tùy chỉnh
│   ├── js/
│   │   └── script.js       # File JavaScript xử lý logic
│   └── images/             # Thư mục chứa hình ảnh
└── README.md               # Hướng dẫn sử dụng
```

## Cách Sử Dụng

### 1. Mở Website
- Mở file `index.html` trong trình duyệt web
- Hoặc sử dụng local server để chạy website

### 2. Đặt Lịch Khám
1. **Bước 1 - Chọn Dịch Vụ**:
   - Chọn loại dịch vụ khám bệnh
   - Chọn bác sĩ phù hợp

2. **Bước 2 - Chọn Thời Gian**:
   - Chọn ngày khám (từ ngày mai trở đi)
   - Chọn giờ khám phù hợp

3. **Bước 3 - Thông Tin Bệnh Nhân**:
   - Nhập họ tên, số điện thoại, email
   - Nhập tuổi và địa chỉ
   - Ghi chú về triệu chứng (tùy chọn)

4. **Bước 4 - Xác Nhận**:
   - Kiểm tra lại thông tin
   - Nhấn "Xác Nhận Đặt Lịch"

### 3. Tính Năng Bổ Sung
- **Validation Real-time**: Kiểm tra thông tin ngay khi nhập
- **Thông Báo Lỗi**: Hiển thị thông báo lỗi rõ ràng
- **Thông Báo Thành Công**: Xác nhận đặt lịch thành công
- **Responsive**: Hoạt động tốt trên mobile và desktop

## Công Nghệ Sử Dụng

### Frontend
- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling và animation
- **JavaScript ES6+**: Logic xử lý
- **Bootstrap 5**: Framework UI
- **Font Awesome**: Icons

### Tính Năng Kỹ Thuật
- **Progressive Web App**: Có thể cài đặt như app
- **Local Storage**: Lưu trữ dữ liệu tạm thời
- **Form Validation**: Kiểm tra tính hợp lệ
- **Responsive Design**: Tương thích đa thiết bị
- **Accessibility**: Hỗ trợ người khuyết tật

## Tùy Chỉnh

### Thay Đổi Thông Tin Phòng Khám
1. Mở file `index.html`
2. Tìm và thay đổi:
   - Tên phòng khám
   - Địa chỉ
   - Số điện thoại
   - Email
   - Giờ làm việc

### Thêm Bác Sĩ Mới
1. Mở file `assets/js/script.js`
2. Tìm object `doctorsByService`
3. Thêm thông tin bác sĩ mới

### Thay Đổi Dịch Vụ
1. Mở file `index.html`
2. Tìm section "Services"
3. Thêm/sửa/xóa các dịch vụ

### Tùy Chỉnh Giao Diện
1. Mở file `assets/css/style.css`
2. Thay đổi màu sắc, font, layout

## Triển Khai

### Local Development
```bash
# Mở terminal trong thư mục dự án
cd booking_phong_kham

# Chạy local server (nếu có Python)
python -m http.server 8000

# Hoặc sử dụng Node.js
npx http-server

# Truy cập website
# http://localhost:8000
```

### Production Deployment
1. Upload tất cả file lên web server
2. Cấu hình domain và SSL
3. Test tất cả tính năng
4. Backup dữ liệu định kỳ

## Bảo Mật

### Các Biện Pháp Bảo Mật
- **Input Validation**: Kiểm tra dữ liệu đầu vào
- **XSS Prevention**: Ngăn chặn tấn công XSS
- **CSRF Protection**: Bảo vệ khỏi CSRF
- **Data Encryption**: Mã hóa dữ liệu nhạy cảm

### Khuyến Nghị
- Sử dụng HTTPS
- Cập nhật thường xuyên
- Backup dữ liệu định kỳ
- Giám sát log hệ thống

## Hỗ Trợ

### Liên Hệ
- **Email**: support@phongkhamtutam.com
- **Điện thoại**: 028 1234 5678
- **Website**: https://phongkhamtutam.com

### Tài Liệu Tham Khảo
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [JavaScript ES6 Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Phiên Bản

### Version 1.0.0
- ✅ Giao diện đặt lịch 4 bước
- ✅ Validation thông tin
- ✅ Responsive design
- ✅ Animation mượt mà
- ✅ Hỗ trợ tiếng Việt

### Roadmap
- 🔄 Tích hợp database
- 🔄 Hệ thống đăng nhập
- 🔄 Quản lý lịch hẹn
- 🔄 Thông báo SMS/Email
- 🔄 Thanh toán online

## License

Dự án này được phát triển dựa trên EasyAppointments (GPL v3.0) và được tùy chỉnh cho thị trường Việt Nam.

---

**Phòng Khám Từ Tâm** - Cam kết mang đến dịch vụ y tế chất lượng cao với đội ngũ bác sĩ giàu kinh nghiệm. 