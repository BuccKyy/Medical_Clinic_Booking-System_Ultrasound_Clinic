// Email Notification System for Doctors

// Email configuration
const EMAIL_CONFIG = {
    // Bác sĩ siêu âm
    'dr-duc': {
        name: 'BS. Trần Trung Đức (Nam - Đeo kính)',
        email: 'trantrungduc313@gmail.com',
        specialty: 'Siêu Âm'
    },
    'dr-phuong': {
        name: 'BS. Trần Thanh Phương (Nữ - Tóc dài)',
        email: 'trantrungduc313@gmail.com',
        specialty: 'Siêu Âm'
    }
};

// Admin email
const ADMIN_EMAIL = 'trantrungduc313@gmail.com';

// Send email notification
function sendEmailNotification(appointment, type = 'new') {
    const doctorInfo = EMAIL_CONFIG[appointment.doctor];
    if (!doctorInfo) {
        console.error('Không tìm thấy thông tin bác sĩ:', appointment.doctor);
        return;
    }

    const emailData = {
        to: doctorInfo.email,
        cc: ADMIN_EMAIL,
        subject: getEmailSubject(appointment, type),
        body: generateEmailBody(appointment, doctorInfo, type)
    };

    // Simulate email sending (in real app, use email service)
    console.log('📧 Gửi email thông báo:', emailData);
    
    // Show notification
    showEmailNotification(emailData);
    
    // In real implementation, you would use:
    // - EmailJS
    // - SendGrid
    // - AWS SES
    // - Gmail API
    // - SMTP server
}

// Get email subject
function getEmailSubject(appointment, type) {
    const patientName = appointment.patientName;
    const date = new Date(appointment.date).toLocaleDateString('vi-VN');
    const time = appointment.time;
    
    switch(type) {
        case 'new':
            return `🆕 Lịch Hẹn Mới - ${patientName} - ${date} ${time}`;
        case 'confirmed':
            return `✅ Lịch Hẹn Đã Xác Nhận - ${patientName} - ${date} ${time}`;
        case 'cancelled':
            return `❌ Lịch Hẹn Bị Hủy - ${patientName} - ${date} ${time}`;
        case 'reminder':
            return `⏰ Nhắc Nhở Lịch Hẹn - ${patientName} - ${date} ${time}`;
        default:
            return `📋 Cập Nhật Lịch Hẹn - ${patientName} - ${date} ${time}`;
    }
}

// Generate email body
function generateEmailBody(appointment, doctorInfo, type) {
    const formattedDate = new Date(appointment.date).toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let actionText = '';
    switch(type) {
        case 'new':
            actionText = 'CÓ LỊCH HẸN MỚI CẦN XÁC NHẬN';
            break;
        case 'confirmed':
            actionText = 'LỊCH HẸN ĐÃ ĐƯỢC XÁC NHẬN';
            break;
        case 'cancelled':
            actionText = 'LỊCH HẸN ĐÃ BỊ HỦY';
            break;
        case 'reminder':
            actionText = 'NHẮC NHỞ LỊCH HẸN';
            break;
    }
    
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🏥 Phòng Khám Từ Tâm</h1>
            <h2 style="margin: 10px 0;">${actionText}</h2>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
            <h3 style="color: #007bff; margin-bottom: 20px;">📋 Thông Tin Lịch Hẹn</h3>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: #28a745; margin-bottom: 15px;">👤 Thông Tin Bệnh Nhân</h4>
                <p><strong>Họ tên:</strong> ${appointment.patientName}</p>
                <p><strong>Số điện thoại:</strong> ${appointment.patientPhone}</p>
                <p><strong>Email:</strong> ${appointment.patientEmail}</p>
                <p><strong>Tuổi:</strong> ${appointment.patientAge}</p>
                <p><strong>Địa chỉ:</strong> ${appointment.patientAddress}</p>
                ${appointment.patientNotes ? `<p><strong>Ghi chú:</strong> ${appointment.patientNotes}</p>` : ''}
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: #007bff; margin-bottom: 15px;">🏥 Thông Tin Khám Bệnh</h4>
                <p><strong>Dịch vụ:</strong> ${appointment.serviceName}</p>
                <p><strong>Bác sĩ phụ trách:</strong> ${doctorInfo.name}</p>
                <p><strong>Chuyên khoa:</strong> ${doctorInfo.specialty}</p>
                <p><strong>Ngày khám:</strong> ${formattedDate}</p>
                <p><strong>Giờ khám:</strong> ${appointment.time}</p>
                <p><strong>Trạng thái:</strong> <span style="color: ${getStatusColor(appointment.status)};">${getStatusText(appointment.status)}</span></p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px;">
                <h4 style="color: #dc3545; margin-bottom: 15px;">⚡ Thao Tác Nhanh</h4>
                <p>🔗 <a href="http://localhost:8000/admin/" style="color: #007bff;">Truy cập trang quản lý</a></p>
                <p>📞 Liên hệ bệnh nhân: <a href="tel:${appointment.patientPhone}" style="color: #007bff;">${appointment.patientPhone}</a></p>
                <p>📧 Gửi email: <a href="mailto:${appointment.patientEmail}" style="color: #007bff;">${appointment.patientEmail}</a></p>
            </div>
        </div>
        
        <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>📧 ${doctorInfo.email} | 📞 028 1234 5678</p>
            <p>🏥 123 Đường ABC, Quận 1, TP.HCM</p>
                            <p>© 2025 Phòng Khám Siêu Âm. Tất cả quyền được bảo lưu.</p>
        </div>
    </div>
    `;
}

// Get status color
function getStatusColor(status) {
    switch(status) {
        case 'pending': return '#ffc107';
        case 'confirmed': return '#28a745';
        case 'completed': return '#17a2b8';
        case 'cancelled': return '#dc3545';
        default: return '#6c757d';
    }
}

// Get status text
function getStatusText(status) {
    switch(status) {
        case 'pending': return 'Chờ xác nhận';
        case 'confirmed': return 'Đã xác nhận';
        case 'completed': return 'Đã hoàn thành';
        case 'cancelled': return 'Đã hủy';
        default: return 'Không xác định';
    }
}

// Show email notification
function showEmailNotification(emailData) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-info alert-dismissible fade show position-fixed';
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 400px; max-width: 500px;';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-envelope fa-2x me-3 text-primary"></i>
            <div>
                <h6 class="mb-1">📧 Email Đã Gửi</h6>
                <p class="mb-1"><strong>Đến:</strong> ${emailData.to}</p>
                <p class="mb-1"><strong>CC:</strong> ${emailData.cc}</p>
                <p class="mb-0"><strong>Tiêu đề:</strong> ${emailData.subject}</p>
            </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Send reminder emails
function sendReminderEmails() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const confirmedAppointments = appointments.filter(appointment => 
        appointment.status === 'confirmed' && 
        (appointment.date === today || appointment.date === tomorrowStr)
    );
    
    confirmedAppointments.forEach(appointment => {
        sendEmailNotification(appointment, 'reminder');
    });
}

// Send notification for new appointment
function notifyNewAppointment(appointment) {
    sendEmailNotification(appointment, 'new');
}

// Send notification for status change
function notifyStatusChange(appointment, newStatus) {
    const type = newStatus === 'confirmed' ? 'confirmed' : 'cancelled';
    sendEmailNotification(appointment, type);
}

// Export functions
window.EmailNotification = {
    sendEmailNotification,
    notifyNewAppointment,
    notifyStatusChange,
    sendReminderEmails
}; 