// Admin Login System

// Admin credentials (in real app, this should be stored securely)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Google Calendar API configuration
const GOOGLE_CALENDAR_CONFIG = {
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    apiKey: 'YOUR_GOOGLE_API_KEY',
    scope: 'https://www.googleapis.com/auth/calendar',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
};

let isAuthenticated = false;
let googleAuth = null;

// Initialize login system
document.addEventListener('DOMContentLoaded', function() {
    setupLoginForm();
    // Delay authentication check to prevent redirect loop
    setTimeout(() => {
        checkAuthentication();
    }, 100);
    // Load Google Calendar API in background
    setTimeout(() => {
        loadGoogleCalendarAPI();
    }, 500);
});

// Setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
}

// Handle login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const resultDiv = document.getElementById('login-result');
    
    // Clear previous messages
    resultDiv.innerHTML = '';
    
    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Set authentication
        isAuthenticated = true;
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        
        // Show success message
        resultDiv.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle me-2"></i>
                Đăng nhập thành công! Đang chuyển hướng...
            </div>
        `;
        
        // Redirect to admin dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    } else {
        // Show error message
        resultDiv.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Tên đăng nhập hoặc mật khẩu không đúng!
            </div>
        `;
    }
}

// Check if user is already authenticated
function checkAuthentication() {
    const isAuth = localStorage.getItem('adminAuthenticated');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (isAuth === 'true' && loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
        
        // Session expires after 8 hours
        if (hoursDiff < 8) {
            isAuthenticated = true;
            // Only redirect if we're on login page and not already redirecting
            if (window.location.pathname.includes('login.html') && !window.location.href.includes('index.html')) {
                console.log('✅ User already authenticated, redirecting to dashboard...');
                window.location.href = 'index.html';
            }
        } else {
            // Session expired
            console.log('❌ Session expired, logging out...');
            logout();
        }
    } else {
        console.log('ℹ️ User not authenticated');
    }
}

// Logout function
function logout() {
    isAuthenticated = false;
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    window.location.href = 'login.html';
}

// Load Google Calendar API
function loadGoogleCalendarAPI() {
    // Check if already loaded
    if (window.gapi) {
        console.log('✅ Google API already loaded');
        initGoogleCalendar();
        return;
    }
    
    console.log('📡 Loading Google Calendar API...');
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
        console.log('✅ Google API script loaded');
        gapi.load('client:auth2', initGoogleCalendar);
    };
    script.onerror = () => {
        console.log('❌ Failed to load Google API script');
    };
    document.head.appendChild(script);
}

// Initialize Google Calendar
function initGoogleCalendar() {
    gapi.client.init({
        apiKey: GOOGLE_CALENDAR_CONFIG.apiKey,
        clientId: GOOGLE_CALENDAR_CONFIG.clientId,
        scope: GOOGLE_CALENDAR_CONFIG.scope,
        discoveryDocs: GOOGLE_CALENDAR_CONFIG.discoveryDocs
    }).then(() => {
        console.log('✅ Google Calendar API đã sẵn sàng');
        googleAuth = gapi.auth2.getAuthInstance();
        
        // Check if user is signed in
        if (googleAuth.isSignedIn.get()) {
            updateGoogleCalendarButton(true);
        }
    }).catch(error => {
        console.error('❌ Lỗi khởi tạo Google Calendar API:', error);
        // Don't block the page if Google API fails
        console.log('ℹ️ Continuing without Google Calendar...');
    });
}

// Connect to Google Calendar
function connectGoogleCalendar() {
    if (!googleAuth) {
        showMessage('Google Calendar API chưa sẵn sàng', 'warning');
        return;
    }
    
    if (googleAuth.isSignedIn.get()) {
        // Already signed in
        showMessage('Đã kết nối Google Calendar', 'success');
        updateGoogleCalendarButton(true);
    } else {
        // Sign in
        googleAuth.signIn().then(() => {
            showMessage('Đã kết nối Google Calendar thành công!', 'success');
            updateGoogleCalendarButton(true);
        }).catch(error => {
            console.error('❌ Lỗi đăng nhập Google Calendar:', error);
            showMessage('Lỗi kết nối Google Calendar', 'danger');
        });
    }
}

// Update Google Calendar button
function updateGoogleCalendarButton(isConnected) {
    const btn = document.getElementById('google-calendar-btn');
    if (isConnected) {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Đã Kết Nối Google Calendar';
        btn.style.background = '#28a745';
    } else {
        btn.innerHTML = '<i class="fab fa-google me-2"></i>Kết Nối Google Calendar';
        btn.style.background = '#4285f4';
    }
}

// Show message
function showMessage(message, type) {
    const resultDiv = document.getElementById('login-result');
    resultDiv.innerHTML = `
        <div class="alert alert-${type}">
            <i class="fas fa-info-circle me-2"></i>
            ${message}
        </div>
    `;
}

// Add appointment to Google Calendar
async function addAppointmentToCalendar(appointment) {
    if (!googleAuth || !googleAuth.isSignedIn.get()) {
        console.log('❌ Chưa kết nối Google Calendar');
        return false;
    }
    
    try {
        const event = {
            'summary': `Lịch Hẹn - ${appointment.patientName}`,
            'description': `
Dịch vụ: ${appointment.serviceName}
Bác sĩ: ${appointment.doctorName}
Bệnh nhân: ${appointment.patientName}
SĐT: ${appointment.patientPhone}
Email: ${appointment.patientEmail}
Tuổi: ${appointment.patientAge}
Địa chỉ: ${appointment.patientAddress}
Ghi chú: ${appointment.patientNotes || 'Không có'}
            `.trim(),
            'start': {
                'dateTime': `${appointment.date}T${appointment.time}:00+07:00`,
                'timeZone': 'Asia/Ho_Chi_Minh'
            },
            'end': {
                'dateTime': `${appointment.date}T${getEndTime(appointment.time)}:00+07:00`,
                'timeZone': 'Asia/Ho_Chi_Minh'
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 30}
                ]
            }
        };
        
        const response = await gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });
        
        console.log('✅ Đã thêm lịch hẹn vào Google Calendar:', response.result);
        return true;
        
    } catch (error) {
        console.error('❌ Lỗi thêm lịch hẹn vào Google Calendar:', error);
        return false;
    }
}

// Get end time (1 hour after start time)
function getEndTime(startTime) {
    const [hours, minutes] = startTime.split(':');
    const endHour = parseInt(hours) + 1;
    return `${endHour.toString().padStart(2, '0')}:${minutes}`;
}

// Export functions for use in other files
window.AdminAuth = {
    isAuthenticated: () => isAuthenticated,
    logout: logout,
    addAppointmentToCalendar: addAppointmentToCalendar
}; 