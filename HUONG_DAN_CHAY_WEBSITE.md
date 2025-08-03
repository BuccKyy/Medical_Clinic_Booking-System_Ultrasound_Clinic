# Hướng Dẫn Chạy Website Booking Lịch Khám

## 🚀 Cách Chạy Website

### Phương Pháp 1: Mở Trực Tiếp (Đơn Giản Nhất)

1. **Mở thư mục dự án**:
   ```bash
   cd /Users/duc/Desktop/booking_phong_kham
   ```

2. **Mở file index.html**:
   - Double-click vào file `index.html`
   - Hoặc chuột phải → "Open with" → Chọn trình duyệt
   - Hoặc kéo file vào trình duyệt

3. **Website sẽ mở trong trình duyệt**:
   - URL: `file:///Users/duc/Desktop/booking_phong_kham/index.html`

### Phương Pháp 2: Sử Dụng Local Server (Khuyến Nghị)

#### Cách A: Sử dụng Python
```bash
# Mở terminal
cd /Users/duc/Desktop/booking_phong_kham

# Chạy server Python
python -m http.server 8000

# Mở trình duyệt và truy cập
# http://localhost:8000
```

#### Cách B: Sử dụng Node.js
```bash
# Mở terminal
cd /Users/duc/Desktop/booking_phong_kham

# Cài đặt http-server (nếu chưa có)
npm install -g http-server

# Chạy server
http-server -p 8000

# Hoặc sử dụng npx
npx http-server -p 8000

# Mở trình duyệt và truy cập
# http://localhost:8000
```

#### Cách C: Sử dụng PHP
```bash
# Mở terminal
cd /Users/duc/Desktop/booking_phong_kham

# Chạy server PHP
php -S localhost:8000

# Mở trình duyệt và truy cập
# http://localhost:8000
```

### Phương Pháp 3: Sử dụng Live Server (VS Code)

1. **Cài đặt extension Live Server** trong VS Code
2. **Mở thư mục dự án** trong VS Code
3. **Chuột phải vào file index.html** → "Open with Live Server"
4. **Website sẽ tự động mở** trong trình duyệt

## 📱 Truy Cập Các Trang

### Trang Chủ (Bệnh Nhân)
- **URL**: `http://localhost:8000` hoặc `http://localhost:8000/index.html`
- **Chức năng**: Đặt lịch khám bệnh

### Trang Quản Lý (Bác Sĩ)
- **URL**: `http://localhost:8000/admin/` hoặc `http://localhost:8000/admin/index.html`
- **Chức năng**: Quản lý lịch hẹn, xác nhận/từ chối

### Trang Lỗi
- **URL**: `http://localhost:8000/error.html`
- **Chức năng**: Hiển thị khi có lỗi

## 🧪 Test Website

### 1. Test Đặt Lịch (Bệnh Nhân)
1. Mở trang chủ
2. Cuộn xuống phần "Đặt Lịch Khám Bệnh"
3. Thực hiện 4 bước đặt lịch:
   - **Bước 1**: Chọn dịch vụ và bác sĩ
   - **Bước 2**: Chọn ngày giờ
   - **Bước 3**: Nhập thông tin bệnh nhân
   - **Bước 4**: Xác nhận đặt lịch
4. Kiểm tra thông báo thành công

### 2. Test Quản Lý (Bác Sĩ)
1. Mở trang admin: `http://localhost:8000/admin/`
2. Kiểm tra thống kê dashboard
3. Sử dụng bộ lọc để tìm lịch hẹn
4. Test xác nhận/từ chối lịch hẹn
5. Xem chi tiết lịch hẹn

### 3. Test Responsive
1. Mở Developer Tools (F12)
2. Chọn chế độ mobile
3. Test trên các kích thước màn hình khác nhau

## 🔧 Cấu Trúc File

```
booking_phong_kham/
├── index.html              # Trang chủ
├── error.html              # Trang lỗi
├── admin/
│   ├── index.html          # Trang quản lý
│   ├── admin.js            # Logic quản lý
│   └── README.md           # Hướng dẫn admin
├── assets/
│   ├── css/
│   │   └── style.css       # CSS tùy chỉnh
│   ├── js/
│   │   └── script.js       # Logic đặt lịch
│   └── images/
│       └── placeholder.txt # Hướng dẫn hình ảnh
├── .htaccess               # Cấu hình Apache
├── package.json            # Quản lý dependencies
├── README.md               # Hướng dẫn tổng quan
├── SUMMARY.md              # Tóm tắt dự án
└── HUONG_DAN_CHAY_WEBSITE.md # File này
```

## 🐛 Xử Lý Lỗi

### Lỗi Thường Gặp

#### 1. Không mở được file
**Nguyên nhân**: Trình duyệt chặn file local
**Giải pháp**: Sử dụng local server thay vì mở trực tiếp

#### 2. Không thấy lịch hẹn trong admin
**Nguyên nhân**: Chưa có dữ liệu
**Giải pháp**: 
1. Đặt lịch từ trang chủ
2. Refresh trang admin
3. Kiểm tra localStorage

#### 3. Lỗi CORS
**Nguyên nhân**: Trình duyệt chặn request
**Giải pháp**: Sử dụng local server

#### 4. Không responsive
**Nguyên nhân**: Cache trình duyệt
**Giải pháp**: 
1. Hard refresh (Ctrl+F5)
2. Xóa cache trình duyệt

### Debug

#### Mở Developer Tools
- **Chrome/Edge**: F12 hoặc Ctrl+Shift+I
- **Firefox**: F12 hoặc Ctrl+Shift+I
- **Safari**: Cmd+Option+I

#### Kiểm Tra Console
- Mở tab Console trong Developer Tools
- Xem có lỗi JavaScript không
- Kiểm tra localStorage

#### Kiểm Tra Network
- Mở tab Network trong Developer Tools
- Xem các file có tải thành công không

## 📞 Hỗ Trợ

### Khi Gặp Vấn Đề
1. **Kiểm tra console** trong Developer Tools
2. **Thử trình duyệt khác** (Chrome, Firefox, Safari)
3. **Xóa cache** và refresh trang
4. **Kiểm tra đường dẫn** file

### Liên Hệ Hỗ Trợ
- **Email**: support@phongkhamtutam.com
- **Điện thoại**: 028 1234 5678

## 🎯 Lưu Ý Quan Trọng

### Bảo Mật
- Website này chỉ là demo
- Dữ liệu lưu trong localStorage (tạm thời)
- Không gửi dữ liệu ra ngoài
- Cần tích hợp database cho production

### Hiệu Suất
- Tải trang nhanh
- Responsive trên mọi thiết bị
- Animation mượt mà
- Validation real-time

### Tính Năng
- Đặt lịch 4 bước đơn giản
- Quản lý lịch hẹn cho bác sĩ
- Thông báo lỗi/thành công
- Bộ lọc thông minh

---

**Chúc bạn sử dụng website thành công!** 🎉 