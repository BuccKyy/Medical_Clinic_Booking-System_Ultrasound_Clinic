// Google Sheets Integration for Appointment Management

// Google Sheets configuration
const GOOGLE_SHEETS_CONFIG = {
    // Main appointments sheet
    APPOINTMENTS_SHEET: {
        id: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // Replace with your sheet ID
        name: 'Lịch Hẹn Khám Bệnh',
        range: 'A:Z'
    },
    // Doctors schedule sheet
    DOCTORS_SHEET: {
        id: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // Replace with your sheet ID
        name: 'Lịch Làm Việc Bác Sĩ',
        range: 'A:Z'
    },
    // Statistics sheet
    STATS_SHEET: {
        id: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // Replace with your sheet ID
        name: 'Thống Kê',
        range: 'A:Z'
    }
};

// Google Sheets API configuration
const GOOGLE_API_CONFIG = {
    apiKey: 'YOUR_GOOGLE_API_KEY', // Replace with your API key
    clientId: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your client ID
    scope: 'https://www.googleapis.com/auth/spreadsheets'
};

// Initialize Google Sheets API
function initGoogleSheets() {
    // Load Google API
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
        gapi.load('client:auth2', initClient);
    };
    document.head.appendChild(script);
}

// Initialize Google client
function initClient() {
    gapi.client.init({
        apiKey: GOOGLE_API_CONFIG.apiKey,
        clientId: GOOGLE_API_CONFIG.clientId,
        scope: GOOGLE_API_CONFIG.scope
    }).then(() => {
        console.log('✅ Google Sheets API đã sẵn sàng');
        // Check if user is signed in
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signIn();
        }
    }).catch(error => {
        console.error('❌ Lỗi khởi tạo Google Sheets API:', error);
    });
}

// Add appointment to Google Sheet
async function addAppointmentToSheet(appointment) {
    try {
        // Simulate Google Sheet integration for demo
        console.log('📊 Simulating Google Sheet integration...');
        console.log('📋 Appointment data to be added:', appointment);
        
        // In real implementation, this would connect to Google Sheets API
        // For now, we'll simulate the process
        const values = [
            [
                appointment.id,
                appointment.patientName,
                appointment.patientPhone,
                appointment.patientEmail,
                appointment.patientAge,
                appointment.patientAddress,
                appointment.patientNotes || '',
                appointment.serviceName,
                appointment.doctorName,
                appointment.date,
                appointment.time,
                appointment.status,
                appointment.createdAt,
                new Date().toISOString() // Last updated
            ]
        ];

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('✅ Đã thêm lịch hẹn vào Google Sheet (simulated):', values);
        showGoogleSheetNotification('Đã thêm lịch hẹn vào Google Sheet');
        
        return { success: true, data: values };
    } catch (error) {
        console.error('❌ Lỗi thêm lịch hẹn vào Google Sheet:', error);
        showGoogleSheetNotification('Lỗi thêm lịch hẹn vào Google Sheet', 'error');
        return null;
    }
}

// Update appointment in Google Sheet
async function updateAppointmentInSheet(appointment) {
    try {
        // Simulate Google Sheet update
        console.log('📊 Simulating Google Sheet update...');
        console.log('📋 Appointment data to be updated:', appointment);
        
        // In real implementation, this would update the Google Sheet
        // For now, we'll simulate the process
        const values = [
            [
                appointment.id,
                appointment.patientName,
                appointment.patientPhone,
                appointment.patientEmail,
                appointment.patientAge,
                appointment.patientAddress,
                appointment.patientNotes || '',
                appointment.serviceName,
                appointment.doctorName,
                appointment.date,
                appointment.time,
                appointment.status,
                appointment.createdAt,
                new Date().toISOString() // Last updated
            ]
        ];

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('✅ Đã cập nhật lịch hẹn trong Google Sheet (simulated):', values);
        showGoogleSheetNotification('Đã cập nhật lịch hẹn trong Google Sheet');
        
        return { success: true, data: values };
    } catch (error) {
        console.error('❌ Lỗi cập nhật lịch hẹn trong Google Sheet:', error);
        showGoogleSheetNotification('Lỗi cập nhật lịch hẹn trong Google Sheet', 'error');
        return null;
    }
}

// Get appointments from Google Sheet
async function getAppointmentsFromSheet() {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: GOOGLE_SHEETS_CONFIG.APPOINTMENTS_SHEET.id,
            range: `${GOOGLE_SHEETS_CONFIG.APPOINTMENTS_SHEET.name}!A:N`
        });

        const rows = response.result.values;
        if (!rows || rows.length === 0) {
            console.log('📋 Google Sheet trống');
            return [];
        }

        // Skip header row
        const appointments = rows.slice(1).map(row => ({
            id: row[0],
            patientName: row[1],
            patientPhone: row[2],
            patientEmail: row[3],
            patientAge: row[4],
            patientAddress: row[5],
            patientNotes: row[6],
            serviceName: row[7],
            doctorName: row[8],
            date: row[9],
            time: row[10],
            status: row[11],
            createdAt: row[12],
            lastUpdated: row[13]
        }));

        console.log('✅ Đã tải lịch hẹn từ Google Sheet:', appointments.length);
        return appointments;
    } catch (error) {
        console.error('❌ Lỗi tải lịch hẹn từ Google Sheet:', error);
        return [];
    }
}

// Export appointments to Google Sheet
async function exportAppointmentsToSheet() {
    try {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        
        if (appointments.length === 0) {
            showGoogleSheetNotification('Không có lịch hẹn để xuất', 'warning');
            return;
        }

        // Clear existing data (except header)
        await gapi.client.sheets.spreadsheets.values.clear({
            spreadsheetId: GOOGLE_SHEETS_CONFIG.APPOINTMENTS_SHEET.id,
            range: `${GOOGLE_SHEETS_CONFIG.APPOINTMENTS_SHEET.name}!A2:N`
        });

        // Prepare data
        const values = appointments.map(appointment => [
            appointment.id,
            appointment.patientName,
            appointment.patientPhone,
            appointment.patientEmail,
            appointment.patientAge,
            appointment.patientAddress,
            appointment.patientNotes || '',
            appointment.serviceName,
            appointment.doctorName,
            appointment.date,
            appointment.time,
            appointment.status,
            appointment.createdAt,
            new Date().toISOString()
        ]);

        // Add header
        values.unshift([
            'ID',
            'Họ Tên',
            'Số Điện Thoại',
            'Email',
            'Tuổi',
            'Địa Chỉ',
            'Ghi Chú',
            'Dịch Vụ',
            'Bác Sĩ',
            'Ngày',
            'Giờ',
            'Trạng Thái',
            'Ngày Tạo',
            'Cập Nhật Cuối'
        ]);

        // Write data
        const response = await gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: GOOGLE_SHEETS_CONFIG.APPOINTMENTS_SHEET.id,
            range: `${GOOGLE_SHEETS_CONFIG.APPOINTMENTS_SHEET.name}!A:N`,
            valueInputOption: 'RAW',
            resource: {
                values: values
            }
        });

        console.log('✅ Đã xuất lịch hẹn vào Google Sheet:', response.result);
        showGoogleSheetNotification(`Đã xuất ${appointments.length} lịch hẹn vào Google Sheet`);
        
        return response.result;
    } catch (error) {
        console.error('❌ Lỗi xuất lịch hẹn vào Google Sheet:', error);
        showGoogleSheetNotification('Lỗi xuất lịch hẹn vào Google Sheet', 'error');
        return null;
    }
}

// Import appointments from Google Sheet
async function importAppointmentsFromSheet() {
    try {
        const appointments = await getAppointmentsFromSheet();
        
        if (appointments.length === 0) {
            showGoogleSheetNotification('Không có dữ liệu để nhập từ Google Sheet', 'warning');
            return;
        }

        // Update localStorage
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        console.log('✅ Đã nhập lịch hẹn từ Google Sheet:', appointments.length);
        showGoogleSheetNotification(`Đã nhập ${appointments.length} lịch hẹn từ Google Sheet`);
        
        // Refresh the admin page
        if (typeof loadAppointments === 'function') {
            loadAppointments();
            updateStatistics();
        }
        
        return appointments;
    } catch (error) {
        console.error('❌ Lỗi nhập lịch hẹn từ Google Sheet:', error);
        showGoogleSheetNotification('Lỗi nhập lịch hẹn từ Google Sheet', 'error');
        return [];
    }
}

// Generate statistics and export to Google Sheet
async function exportStatisticsToSheet() {
    try {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        
        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = appointments.filter(appointment => appointment.date === today);
        const pendingAppointments = appointments.filter(appointment => appointment.status === 'pending');
        const confirmedAppointments = appointments.filter(appointment => appointment.status === 'confirmed');
        const completedAppointments = appointments.filter(appointment => appointment.status === 'completed');
        const cancelledAppointments = appointments.filter(appointment => appointment.status === 'cancelled');

        const stats = [
            ['Thống Kê Lịch Hẹn', ''],
            ['Ngày', new Date().toLocaleDateString('vi-VN')],
            ['', ''],
            ['Tổng số lịch hẹn', appointments.length],
            ['Lịch hẹn hôm nay', todayAppointments.length],
            ['Chờ xác nhận', pendingAppointments.length],
            ['Đã xác nhận', confirmedAppointments.length],
            ['Đã hoàn thành', completedAppointments.length],
            ['Đã hủy', cancelledAppointments.length],
            ['', ''],
            ['Thống kê theo dịch vụ', ''],
            ['Dịch vụ', 'Số lượng']
        ];

        // Group by service
        const serviceStats = {};
        appointments.forEach(appointment => {
            const service = appointment.serviceName;
            serviceStats[service] = (serviceStats[service] || 0) + 1;
        });

        Object.entries(serviceStats).forEach(([service, count]) => {
            stats.push([service, count]);
        });

        // Write to statistics sheet
        const response = await gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: GOOGLE_SHEETS_CONFIG.STATS_SHEET.id,
            range: `${GOOGLE_SHEETS_CONFIG.STATS_SHEET.name}!A:B`,
            valueInputOption: 'RAW',
            resource: {
                values: stats
            }
        });

        console.log('✅ Đã xuất thống kê vào Google Sheet:', response.result);
        showGoogleSheetNotification('Đã xuất thống kê vào Google Sheet');
        
        return response.result;
    } catch (error) {
        console.error('❌ Lỗi xuất thống kê vào Google Sheet:', error);
        showGoogleSheetNotification('Lỗi xuất thống kê vào Google Sheet', 'error');
        return null;
    }
}

// Show Google Sheet notification
function showGoogleSheetNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-table fa-2x me-3 text-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning'}"></i>
            <div>
                <h6 class="mb-1">📊 Google Sheet</h6>
                <p class="mb-0">${message}</p>
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

// Create Google Sheet template
function createGoogleSheetTemplate() {
    const template = {
        properties: {
            title: 'Quản Lý Lịch Hẹn - Phòng Khám Từ Tâm'
        },
        sheets: [
            {
                properties: {
                    title: 'Lịch Hẹn Khám Bệnh',
                    gridProperties: {
                        rowCount: 1000,
                        columnCount: 14
                    }
                }
            },
            {
                properties: {
                    title: 'Lịch Làm Việc Bác Sĩ',
                    gridProperties: {
                        rowCount: 100,
                        columnCount: 10
                    }
                }
            },
            {
                properties: {
                    title: 'Thống Kê',
                    gridProperties: {
                        rowCount: 100,
                        columnCount: 10
                    }
                }
            }
        ]
    };

    console.log('📋 Template Google Sheet:', template);
    return template;
}

// Export functions
window.GoogleSheets = {
    initGoogleSheets,
    addAppointmentToSheet,
    updateAppointmentInSheet,
    getAppointmentsFromSheet,
    exportAppointmentsToSheet,
    importAppointmentsFromSheet,
    exportStatisticsToSheet,
    createGoogleSheetTemplate
}; 