# Hướng Dẫn Cấu Hình Email và Google Sheet

## 📧 Cấu Hình Email Thông Báo

### 1. Thông Tin Email Bác Sĩ

Hiện tại hệ thống đã cấu hình sẵn email cho các bác sĩ:

#### Bác Sĩ Siêu Âm
- **BS. Trần Trung Đức**: `trantrungduc313@gmail.com`
- **BS. Trần Thanh Phương**: `trantrungduc313@gmail.com`

#### Admin
- **Admin**: `trantrungduc313@gmail.com`

### 2. Cách Thay Đổi Email

Để thay đổi email bác sĩ, chỉnh sửa file `admin/email-notification.js`:

```javascript
const EMAIL_CONFIG = {
    'dr-nguyen': {
        name: 'BS. Nguyễn Văn An',
        email: 'your-email@gmail.com', // Thay đổi email ở đây
        specialty: 'Khám Tổng Quát'
    },
    // ... thêm các bác sĩ khác
};
```

### 3. Tích Hợp Email Service

Hiện tại hệ thống chỉ mô phỏng gửi email. Để gửi email thực tế, bạn cần tích hợp một trong các service sau:

#### A. EmailJS (Đơn Giản)
1. Đăng ký tại [EmailJS](https://www.emailjs.com/)
2. Tạo email template
3. Thêm code sau vào `email-notification.js`:

```javascript
// Thêm vào đầu file
emailjs.init("YOUR_USER_ID");

// Thay thế hàm sendEmailNotification
function sendEmailNotification(appointment, type = 'new') {
    const doctorInfo = EMAIL_CONFIG[appointment.doctor];
    
    const templateParams = {
        to_email: doctorInfo.email,
        to_name: doctorInfo.name,
        patient_name: appointment.patientName,
        appointment_date: appointment.date,
        appointment_time: appointment.time,
        service_name: appointment.serviceName,
        patient_phone: appointment.patientPhone,
        patient_email: appointment.patientEmail
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(response => {
            console.log('Email sent successfully:', response);
            showEmailNotification(emailData);
        })
        .catch(error => {
            console.error('Email send failed:', error);
        });
}
```

#### B. SendGrid (Chuyên Nghiệp)
1. Đăng ký tại [SendGrid](https://sendgrid.com/)
2. Tạo API key
3. Thêm code sau:

```javascript
// Thêm vào đầu file
const SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY';

async function sendEmailNotification(appointment, type = 'new') {
    const doctorInfo = EMAIL_CONFIG[appointment.doctor];
    
    const emailData = {
        personalizations: [{
            to: [{ email: doctorInfo.email, name: doctorInfo.name }],
            cc: [{ email: ADMIN_EMAIL, name: 'Admin' }]
        }],
        from: { email: 'noreply@phongkhamtutam.com', name: 'Phòng Khám Từ Tâm' },
        subject: getEmailSubject(appointment, type),
        content: [{
            type: 'text/html',
            value: generateEmailBody(appointment, doctorInfo, type)
        }]
    };
    
    try {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });
        
        if (response.ok) {
            showEmailNotification(emailData);
        }
    } catch (error) {
        console.error('Email send failed:', error);
    }
}
```

## 📊 Cấu Hình Google Sheet

### 1. Tạo Google Sheet

1. **Tạo Google Sheet mới**:
   - Mở [Google Sheets](https://sheets.google.com/)
   - Tạo sheet mới với tên "Quản Lý Lịch Hẹn - Phòng Khám Từ Tâm"

2. **Tạo các sheet con**:
   - **Sheet 1**: "Lịch Hẹn Khám Bệnh"
   - **Sheet 2**: "Lịch Làm Việc Bác Sĩ"
   - **Sheet 3**: "Thống Kê"

3. **Cấu trúc Sheet "Lịch Hẹn Khám Bệnh"**:
   ```
   A        B          C              D        E      F          G        H          I          J        K      L            M              N
   ID       Họ Tên     Số Điện Thoại  Email    Tuổi   Địa Chỉ    Ghi Chú  Dịch Vụ    Bác Sĩ    Ngày     Giờ    Trạng Thái   Ngày Tạo       Cập Nhật Cuối
   ```

### 2. Cấu Hình Google API

#### A. Tạo Google Cloud Project
1. Mở [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới
3. Bật Google Sheets API

#### B. Tạo Credentials
1. Vào "APIs & Services" > "Credentials"
2. Tạo "API Key" và "OAuth 2.0 Client ID"
3. Cấu hình OAuth consent screen

#### C. Cập Nhật Cấu Hình
Chỉnh sửa file `admin/google-sheet.js`:

```javascript
const GOOGLE_API_CONFIG = {
    apiKey: 'YOUR_GOOGLE_API_KEY', // Thay bằng API key thực
    clientId: 'YOUR_GOOGLE_CLIENT_ID', // Thay bằng Client ID thực
    scope: 'https://www.googleapis.com/auth/spreadsheets'
};

const GOOGLE_SHEETS_CONFIG = {
    APPOINTMENTS_SHEET: {
        id: 'YOUR_SHEET_ID', // Thay bằng Sheet ID thực
        name: 'Lịch Hẹn Khám Bệnh',
        range: 'A:Z'
    },
    // ... cập nhật các sheet khác
};
```

### 3. Lấy Sheet ID
1. Mở Google Sheet
2. Copy URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
3. Sheet ID là phần giữa `/d/` và `/edit`

### 4. Cấu Hình Quyền Truy Cập
1. Chia sẻ Google Sheet với email service account
2. Hoặc đặt quyền "Anyone with the link can view"

## 🔧 Cấu Hình Nâng Cao

### 1. Tự Động Gửi Email
Hệ thống tự động gửi email nhắc nhở lúc 8:00 sáng mỗi ngày:

```javascript
// Trong admin.js
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 8 && now.getMinutes() === 0) {
        sendReminderEmails();
    }
}, 60000);
```

### 2. Đồng Bộ Google Sheet
Hệ thống tự động đồng bộ dữ liệu với Google Sheet:

```javascript
// Khi có lịch hẹn mới
GoogleSheets.addAppointmentToSheet(appointment);

// Khi cập nhật trạng thái
GoogleSheets.updateAppointmentInSheet(appointment);
```

### 3. Thống Kê Tự Động
Xuất thống kê vào Google Sheet:

```javascript
// Xuất thống kê
GoogleSheets.exportStatisticsToSheet();
```

## 📋 Danh Sách Email Bác Sĩ

| Bác Sĩ | Email | Chuyên Khoa |
|--------|-------|-------------|
| BS. Trần Trung Đức | trantrungduc313@gmail.com | Siêu Âm |
| BS. Trần Thanh Phương | trantrungduc313@gmail.com | Siêu Âm |
| Admin | trantrungduc313@gmail.com | Quản Lý |

## 🚀 Triển Khai Production

### 1. Email Service
- Sử dụng SendGrid hoặc AWS SES cho production
- Cấu hình SPF, DKIM, DMARC
- Monitor email delivery

### 2. Google Sheet
- Sử dụng service account
- Cấu hình backup tự động
- Monitor API quotas

### 3. Bảo Mật
- Mã hóa dữ liệu nhạy cảm
- Sử dụng HTTPS
- Backup dữ liệu định kỳ

---

**Lưu ý**: Đây là cấu hình demo. Trong môi trường production, cần thay thế bằng các service thực tế và cấu hình bảo mật đầy đủ. 