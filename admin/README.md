# Hướng Dẫn Sử Dụng Trang Quản Lý Lịch Hẹn

## 🎯 Mục Đích
Trang quản lý này giúp bác sĩ và nhân viên phòng khám theo dõi, quản lý và xử lý các lịch hẹn của bệnh nhân.

## 🚀 Cách Truy Cập

### 1. Từ Trang Chủ
- Mở website: `http://localhost:8000`
- Truy cập: `http://localhost:8000/admin/`

### 2. Trực Tiếp
- Mở file: `admin/index.html` trong trình duyệt

## 📊 Tính Năng Chính

### 1. Dashboard Thống Kê
- **Hôm Nay**: Số lịch hẹn trong ngày
- **Tuần Này**: Số lịch hẹn trong tuần
- **Chờ Xác Nhận**: Lịch hẹn chưa xác nhận
- **Tổng Cộng**: Tổng số lịch hẹn

### 2. Bộ Lọc Thông Minh
- **Chọn Ngày**: Lọc theo ngày cụ thể
- **Trạng Thái**: Lọc theo trạng thái lịch hẹn
- **Dịch Vụ**: Lọc theo loại dịch vụ khám
- **Làm Mới**: Cập nhật dữ liệu mới nhất

### 3. Quản Lý Lịch Hẹn
- **Xem Chi Tiết**: Xem thông tin đầy đủ bệnh nhân
- **Xác Nhận**: Xác nhận lịch hẹn
- **Từ Chối**: Hủy lịch hẹn
- **Cập Nhật Trạng Thái**: Thay đổi trạng thái lịch hẹn

## 📋 Trạng Thái Lịch Hẹn

### 🟡 Chờ Xác Nhận (Pending)
- Lịch hẹn mới được đặt
- Cần bác sĩ xác nhận hoặc từ chối
- Hiển thị nút "Xác Nhận" và "Từ Chối"

### 🟢 Đã Xác Nhận (Confirmed)
- Bác sĩ đã xác nhận lịch hẹn
- Bệnh nhân đã được thông báo
- Có thể thay đổi thành "Đã hoàn thành"

### 🔵 Đã Hoàn Thành (Completed)
- Bệnh nhân đã khám xong
- Lịch hẹn đã hoàn tất
- Không thể thay đổi trạng thái

### 🔴 Đã Hủy (Cancelled)
- Lịch hẹn bị hủy
- Bệnh nhân đã được thông báo
- Không thể thay đổi trạng thái

## 🎯 Cách Sử Dụng

### 1. Xem Lịch Hẹn
1. Mở trang quản lý
2. Sử dụng bộ lọc để tìm lịch hẹn cần thiết
3. Nhấn "Xem Chi Tiết" để xem thông tin đầy đủ

### 2. Xác Nhận Lịch Hẹn
1. Tìm lịch hẹn có trạng thái "Chờ xác nhận"
2. Nhấn "Xác Nhận" hoặc "Xem Chi Tiết" → "Xác Nhận"
3. Hệ thống sẽ cập nhật trạng thái và thông báo

### 3. Từ Chối Lịch Hẹn
1. Tìm lịch hẹn cần từ chối
2. Nhấn "Từ Chối" hoặc "Xem Chi Tiết" → "Hủy Lịch"
3. Hệ thống sẽ cập nhật trạng thái

### 4. Lọc Lịch Hẹn
1. Chọn ngày cụ thể (mặc định là hôm nay)
2. Chọn trạng thái cần lọc
3. Chọn dịch vụ cần lọc
4. Nhấn "Làm Mới" để cập nhật

## 📱 Thông Tin Hiển Thị

### Thông Tin Bệnh Nhân
- **Họ tên**: Tên đầy đủ bệnh nhân
- **Số điện thoại**: Liên hệ chính
- **Email**: Email liên hệ
- **Tuổi**: Tuổi bệnh nhân
- **Địa chỉ**: Địa chỉ hiện tại
- **Ghi chú**: Triệu chứng hoặc lý do khám

### Thông Tin Lịch Hẹn
- **Dịch vụ**: Loại khám bệnh
- **Bác sĩ**: Bác sĩ phụ trách
- **Ngày**: Ngày khám bệnh
- **Giờ**: Giờ khám bệnh
- **Trạng thái**: Trạng thái hiện tại
- **Ngày đặt**: Thời gian bệnh nhân đặt lịch

## 🔔 Thông Báo

### Thông Báo Thành Công
- ✅ "Đã xác nhận lịch hẹn thành công!"
- ✅ "Đã hủy lịch hẹn thành công!"
- ℹ️ "Đã làm mới dữ liệu!"

### Thông Báo Lỗi
- ❌ "Không thể xác nhận lịch hẹn"
- ❌ "Không thể hủy lịch hẹn"

## 🛠 Tính Năng Kỹ Thuật

### Lưu Trữ Dữ Liệu
- Sử dụng localStorage để lưu trữ tạm thời
- Dữ liệu được lưu trong trình duyệt
- Tự động đồng bộ giữa các tab

### Bảo Mật
- Chỉ hiển thị dữ liệu trong trình duyệt
- Không gửi dữ liệu ra ngoài
- Bảo vệ thông tin bệnh nhân

### Hiệu Suất
- Tải trang nhanh
- Cập nhật real-time
- Giao diện responsive

## 📞 Hỗ Trợ

### Khi Gặp Vấn Đề
1. **Không thấy lịch hẹn**: Kiểm tra bộ lọc
2. **Không thể xác nhận**: Kiểm tra trạng thái lịch hẹn
3. **Dữ liệu bị mất**: Làm mới trang và kiểm tra localStorage

### Liên Hệ Hỗ Trợ
- **Email**: support@phongkhamtutam.com
- **Điện thoại**: 028 1234 5678
- **Giờ làm việc**: 7:00 - 17:00 (Thứ 2-6)

## 🔄 Cập Nhật Tương Lai

### Tính Năng Sắp Tới
- 🔄 Gửi email thông báo tự động
- 🔄 Gửi SMS thông báo
- 🔄 Tích hợp với hệ thống quản lý bệnh viện
- 🔄 Xuất báo cáo PDF
- 🔄 Lịch sử thay đổi trạng thái
- 🔄 Thống kê chi tiết

---

**Lưu ý**: Đây là phiên bản demo. Trong môi trường thực tế, cần tích hợp với database và hệ thống bảo mật đầy đủ. 