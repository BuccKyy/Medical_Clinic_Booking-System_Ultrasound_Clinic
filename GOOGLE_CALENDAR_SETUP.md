# 🗓️ Hướng Dẫn Cấu Hình Google Calendar

## 📋 Tổng Quan

Hệ thống đã được tích hợp Google Calendar để tự động thêm lịch hẹn vào calendar của admin. Khi bệnh nhân đặt lịch, hệ thống sẽ tự động tạo event trong Google Calendar.

## 🔧 Cấu Hình Google Calendar API

### Bước 1: Tạo Google Cloud Project

1. **Truy cập Google Cloud Console**
   - Vào: https://console.cloud.google.com/
   - Tạo project mới hoặc chọn project có sẵn

2. **Bật Google Calendar API**
   - Vào "APIs & Services" > "Library"
   - Tìm "Google Calendar API"
   - Click "Enable"

### Bước 2: Tạo Credentials

1. **Tạo API Key**
   - Vào "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy API Key

2. **Tạo OAuth 2.0 Client ID**
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Chọn "Web application"
   - Thêm Authorized JavaScript origins:
     ```
     http://localhost:8000
     http://localhost:3000
     file://
     ```
   - Thêm Authorized redirect URIs:
     ```
     http://localhost:8000/admin/login.html
     http://localhost:3000/admin/login.html
     ```
   - Copy Client ID

### Bước 3: Cập Nhật Code

1. **Mở file `admin/login.js`**
2. **Thay thế thông tin cấu hình:**

```javascript
const GOOGLE_CALENDAR_CONFIG = {
    clientId: 'YOUR_CLIENT_ID_HERE', // Thay bằng Client ID thật
    apiKey: 'YOUR_API_KEY_HERE',     // Thay bằng API Key thật
    scope: 'https://www.googleapis.com/auth/calendar',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
};
```

## 🚀 Cách Sử Dụng

### 1. Đăng Nhập Admin
- **URL**: `admin/login.html`
- **Username**: `admin`
- **Password**: `admin123`

### 2. Kết Nối Google Calendar
1. **Đăng nhập admin**
2. **Click "Kết Nối Google Calendar"**
3. **Chọn tài khoản Google**
4. **Cấp quyền truy cập Calendar**

### 3. Tự Động Thêm Lịch Hẹn
- Khi bệnh nhân đặt lịch, hệ thống sẽ tự động:
  - Tạo event trong Google Calendar
  - Thêm thông tin bệnh nhân
  - Đặt reminder 24h và 30 phút trước

## 📅 Cấu Trúc Event Google Calendar

### Thông Tin Event:
- **Tiêu đề**: `Lịch Hẹn - [Tên Bệnh Nhân]`
- **Mô tả**: Đầy đủ thông tin bệnh nhân và dịch vụ
- **Thời gian**: Theo lịch hẹn đã đặt
- **Reminder**: 24h và 30 phút trước

### Ví Dụ Event:
```
Tiêu đề: Lịch Hẹn - Nguyễn Văn Anh
Mô tả:
Dịch vụ: Siêu Âm Tổng Quát
Bác sĩ: BS. Trần Trung Đức (Nam - Đeo kính)
Bệnh nhân: Nguyễn Văn Anh
SĐT: 0901234567
Email: anh@gmail.com
Tuổi: 30
Địa chỉ: 123 ABC Street
Ghi chú: Không có
Thời gian: 15/01/2025 09:00-10:00
```

## 🔒 Bảo Mật

### 1. Credentials
- **Không chia sẻ** API Key và Client ID
- **Giới hạn domain** trong Google Cloud Console
- **Sử dụng HTTPS** trong production

### 2. Quyền Truy Cập
- Chỉ admin có thể kết nối Google Calendar
- Session timeout sau 8 giờ
- Tự động logout khi hết hạn

## 🛠️ Troubleshooting

### Lỗi Thường Gặp:

1. **"Google Calendar API chưa sẵn sàng"**
   - Kiểm tra API Key và Client ID
   - Đảm bảo đã bật Google Calendar API

2. **"Lỗi kết nối Google Calendar"**
   - Kiểm tra internet connection
   - Thử lại sau vài phút

3. **"Không thấy event trong Calendar"**
   - Kiểm tra quyền truy cập Calendar
   - Đảm bảo đã đăng nhập đúng tài khoản

### Debug:
- Mở Developer Tools (F12)
- Xem Console để kiểm tra lỗi
- Kiểm tra Network tab

## 📞 Hỗ Trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. **Console logs** trong browser
2. **Google Cloud Console** logs
3. **Network connectivity**
4. **API quotas** và limits

---

**Lưu ý**: Đây là demo system. Trong production, cần:
- Bảo mật credentials
- Sử dụng HTTPS
- Implement proper error handling
- Add rate limiting
- Monitor API usage 