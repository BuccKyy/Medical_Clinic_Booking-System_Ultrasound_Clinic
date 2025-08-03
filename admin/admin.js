// Admin Dashboard JavaScript

// Appointment data from localStorage
let appointments = [];

let currentAppointment = null;

// Initialize admin dashboard with performance optimization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Admin dashboard initializing...');
    
    // Check authentication first with delay to prevent loop
    setTimeout(() => {
        if (typeof AdminAuth !== 'undefined' && !AdminAuth.isAuthenticated()) {
            console.log('❌ Not authenticated, redirecting to login...');
            window.location.href = 'login.html';
            return;
        }
        
        console.log('✅ Authentication check passed, loading dashboard...');
        
        // Load data first
        loadAppointmentsFromStorage();
        
        // Update UI with delay to prevent lag
        setTimeout(() => {
            loadAppointments();
            updateStatistics();
            setupEventListeners();
            
            console.log('✅ Dashboard loaded successfully!');
        }, 100);
        
        // Initialize Google Sheets API with longer delay
        setTimeout(() => {
            if (typeof GoogleSheets !== 'undefined') {
                console.log('📊 Initializing Google Sheets...');
                GoogleSheets.initGoogleSheets();
            }
        }, 500);
        
    }, 300);
});

// Debounce function to prevent excessive calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Setup event listeners with debouncing
function setupEventListeners() {
    // Filter event listeners with debouncing
    const debouncedFilter = debounce(filterAppointments, 300);
    
    document.getElementById('date-filter').addEventListener('change', debouncedFilter);
    document.getElementById('status-filter').addEventListener('change', debouncedFilter);
    document.getElementById('service-filter').addEventListener('change', debouncedFilter);
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date-filter').value = today;
    
    console.log('✅ Event listeners setup completed');
}

// Load appointments with performance optimization
function loadAppointments() {
    console.log('📋 Loading appointments...');
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';
    
    if (appointments.length === 0) {
        appointmentsList.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Không có lịch hẹn nào</h5>
                <p class="text-muted">Chưa có bệnh nhân nào đặt lịch hẹn.</p>
            </div>
        `;
        return;
    }
    
    // Sort appointments by date and time
    const sortedAppointments = appointments.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
        return dateA - dateB;
    });
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Process appointments in chunks to prevent UI blocking
    const chunkSize = 10;
    let currentIndex = 0;
    
    function processChunk() {
        const endIndex = Math.min(currentIndex + chunkSize, sortedAppointments.length);
        
        for (let i = currentIndex; i < endIndex; i++) {
            const appointmentCard = createAppointmentCard(sortedAppointments[i]);
            fragment.appendChild(appointmentCard);
        }
        
        currentIndex = endIndex;
        
        if (currentIndex < sortedAppointments.length) {
            // Process next chunk after a short delay
            setTimeout(processChunk, 10);
        } else {
            // All chunks processed, append to DOM
            appointmentsList.appendChild(fragment);
            console.log(`✅ Loaded ${sortedAppointments.length} appointments`);
        }
    }
    
    // Start processing chunks
    processChunk();
}

// Create appointment card
function createAppointmentCard(appointment) {
    const card = document.createElement('div');
    card.className = `card appointment-card ${getStatusClass(appointment.status)}`;
    card.setAttribute('data-appointment-id', appointment.id);
    
    const statusText = getStatusText(appointment.status);
    const statusClass = getStatusBadgeClass(appointment.status);
    
    const formattedDate = new Date(appointment.date).toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h6 class="card-title mb-0">
                            <i class="fas fa-user me-2"></i>
                            ${appointment.patientName}
                        </h6>
                        <span class="badge ${statusClass} status-badge">${statusText}</span>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <p class="mb-1">
                                <i class="fas fa-calendar me-2"></i>
                                <strong>Ngày:</strong> ${formattedDate}
                            </p>
                            <p class="mb-1">
                                <i class="fas fa-clock me-2"></i>
                                <strong>Giờ:</strong> ${appointment.time}
                            </p>
                            <p class="mb-1">
                                <i class="fas fa-stethoscope me-2"></i>
                                <strong>Dịch vụ:</strong> ${appointment.serviceName}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p class="mb-1">
                                <i class="fas fa-phone me-2"></i>
                                <strong>SĐT:</strong> ${appointment.patientPhone}
                            </p>
                            <p class="mb-1">
                                <i class="fas fa-envelope me-2"></i>
                                <strong>Email:</strong> ${appointment.patientEmail}
                            </p>
                            <p class="mb-1">
                                <i class="fas fa-birthday-cake me-2"></i>
                                <strong>Tuổi:</strong> ${appointment.patientAge}
                            </p>
                        </div>
                    </div>
                    ${appointment.patientNotes ? `
                        <p class="mb-0 mt-2">
                            <i class="fas fa-notes-medical me-2"></i>
                            <strong>Ghi chú:</strong> ${appointment.patientNotes}
                        </p>
                    ` : ''}
                </div>
                <div class="col-md-4 text-end">
                    <button class="btn btn-primary btn-sm mb-2" onclick="viewAppointment(${appointment.id})">
                        <i class="fas fa-eye me-1"></i>Xem Chi Tiết
                    </button>
                    ${appointment.status === 'pending' ? `
                        <div class="btn-group-vertical w-100">
                            <button class="btn btn-success btn-sm mb-1" onclick="confirmAppointmentById(${appointment.id})">
                                <i class="fas fa-check me-1"></i>Xác Nhận
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="cancelAppointmentById(${appointment.id})">
                                <i class="fas fa-times me-1"></i>Từ Chối
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Get status class for card border
function getStatusClass(status) {
    switch(status) {
        case 'pending': return '';
        case 'confirmed': return '';
        case 'completed': return 'completed';
        case 'cancelled': return 'urgent';
        default: return '';
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

// Get status badge class
function getStatusBadgeClass(status) {
    switch(status) {
        case 'pending': return 'bg-warning text-dark';
        case 'confirmed': return 'bg-success';
        case 'completed': return 'bg-info';
        case 'cancelled': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

// Filter appointments
function filterAppointments() {
    const dateFilter = document.getElementById('date-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const serviceFilter = document.getElementById('service-filter').value;
    
    let filteredAppointments = appointments;
    
    // Filter by date
    if (dateFilter) {
        filteredAppointments = filteredAppointments.filter(appointment => 
            appointment.date === dateFilter
        );
    }
    
    // Filter by status
    if (statusFilter) {
        filteredAppointments = filteredAppointments.filter(appointment => 
            appointment.status === statusFilter
        );
    }
    
    // Filter by service
    if (serviceFilter) {
        filteredAppointments = filteredAppointments.filter(appointment => 
            appointment.service === serviceFilter
        );
    }
    
    displayFilteredAppointments(filteredAppointments);
}

// Display filtered appointments
function displayFilteredAppointments(filteredAppointments) {
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';
    
    if (filteredAppointments.length === 0) {
        appointmentsList.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Không tìm thấy lịch hẹn</h5>
                <p class="text-muted">Không có lịch hẹn nào phù hợp với bộ lọc.</p>
            </div>
        `;
        return;
    }
    
    // Sort appointments by date and time
    const sortedAppointments = filteredAppointments.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
        return dateA - dateB;
    });
    
    sortedAppointments.forEach(appointment => {
        const appointmentCard = createAppointmentCard(appointment);
        appointmentsList.appendChild(appointmentCard);
    });
}

// Update statistics
function updateStatistics() {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(appointment => appointment.date === today);
    const pendingAppointments = appointments.filter(appointment => appointment.status === 'pending');
    
    document.getElementById('today-count').textContent = todayAppointments.length;
    document.getElementById('week-count').textContent = getWeekAppointments().length;
    document.getElementById('pending-count').textContent = pendingAppointments.length;
    document.getElementById('total-count').textContent = appointments.length;
}

// Get week appointments
function getWeekAppointments() {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    return appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= weekStart && appointmentDate <= weekEnd;
    });
}

// View appointment details
function viewAppointment(appointmentId) {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (!appointment) return;
    
    currentAppointment = appointment;
    
    const formattedDate = new Date(appointment.date).toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const statusText = getStatusText(appointment.status);
    const statusClass = getStatusBadgeClass(appointment.status);
    
    document.getElementById('appointment-detail').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6 class="fw-bold">Thông Tin Bệnh Nhân</h6>
                <p><strong>Họ tên:</strong> ${appointment.patientName}</p>
                <p><strong>Số điện thoại:</strong> ${appointment.patientPhone}</p>
                <p><strong>Email:</strong> ${appointment.patientEmail}</p>
                <p><strong>Tuổi:</strong> ${appointment.patientAge}</p>
                <p><strong>Địa chỉ:</strong> ${appointment.patientAddress}</p>
                ${appointment.patientNotes ? `<p><strong>Ghi chú:</strong> ${appointment.patientNotes}</p>` : ''}
            </div>
            <div class="col-md-6">
                <h6 class="fw-bold">Thông Tin Lịch Hẹn</h6>
                <p><strong>Dịch vụ:</strong> ${appointment.serviceName}</p>
                <p><strong>Bác sĩ:</strong> ${appointment.doctorName}</p>
                <p><strong>Ngày:</strong> ${formattedDate}</p>
                <p><strong>Giờ:</strong> ${appointment.time}</p>
                <p><strong>Trạng thái:</strong> <span class="badge ${statusClass}">${statusText}</span></p>
                <p><strong>Ngày đặt:</strong> ${new Date(appointment.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
        </div>
    `;
    
    // Show/hide action buttons based on status
    const confirmBtn = document.querySelector('#appointmentModal .btn-success');
    const cancelBtn = document.querySelector('#appointmentModal .btn-danger');
    
    if (appointment.status === 'pending') {
        confirmBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
    } else {
        confirmBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    }
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('appointmentModal'));
    modal.show();
}

// Confirm appointment
function confirmAppointment() {
    if (!currentAppointment) return;
    
    currentAppointment.status = 'confirmed';
    updateAppointmentInStorage();
    loadAppointments();
    updateStatistics();
    
    // Show success message
    showNotification('Đã xác nhận lịch hẹn thành công!', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
    modal.hide();
}

// Cancel appointment
function cancelAppointment() {
    if (!currentAppointment) return;
    
    currentAppointment.status = 'cancelled';
    updateAppointmentInStorage();
    loadAppointments();
    updateStatistics();
    
    // Show success message
    showNotification('Đã hủy lịch hẹn thành công!', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
    modal.hide();
}

// Confirm appointment by ID
function confirmAppointmentById(appointmentId) {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
        appointment.status = 'confirmed';
        updateAppointmentInStorage();
        loadAppointments();
        updateStatistics();
        
        // Send email notification
        if (typeof EmailNotification !== 'undefined') {
            EmailNotification.notifyStatusChange(appointment, 'confirmed');
        }
        
        // Update Google Sheet
        if (typeof GoogleSheets !== 'undefined') {
            GoogleSheets.updateAppointmentInSheet(appointment);
        }
        
        showNotification('Đã xác nhận lịch hẹn thành công!', 'success');
    }
}

// Cancel appointment by ID
function cancelAppointmentById(appointmentId) {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
        appointment.status = 'cancelled';
        updateAppointmentInStorage();
        loadAppointments();
        updateStatistics();
        
        // Send email notification
        if (typeof EmailNotification !== 'undefined') {
            EmailNotification.notifyStatusChange(appointment, 'cancelled');
        }
        
        // Update Google Sheet
        if (typeof GoogleSheets !== 'undefined') {
            GoogleSheets.updateAppointmentInSheet(appointment);
        }
        
        showNotification('Đã hủy lịch hẹn thành công!', 'success');
    }
}

// Refresh appointments
function refreshAppointments() {
    loadAppointments();
    updateStatistics();
    showNotification('Đã làm mới dữ liệu!', 'info');
}

// Update appointment in storage
function updateAppointmentInStorage() {
    // In a real app, this would update the database
    // For now, we'll just update the local array
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Load appointments from storage on page load
function loadAppointmentsFromStorage() {
    const stored = localStorage.getItem('appointments');
    if (stored) {
        appointments = JSON.parse(stored);
    }
}

// Initialize storage
loadAppointmentsFromStorage();

// Google Sheets functions
function exportToGoogleSheet() {
    if (typeof GoogleSheets !== 'undefined') {
        GoogleSheets.exportAppointmentsToSheet();
    } else {
        showNotification('Google Sheets API chưa sẵn sàng', 'warning');
    }
}

function importFromGoogleSheet() {
    if (typeof GoogleSheets !== 'undefined') {
        GoogleSheets.importAppointmentsFromSheet();
    } else {
        showNotification('Google Sheets API chưa sẵn sàng', 'warning');
    }
}

// Send reminder emails
function sendReminderEmails() {
    if (typeof EmailNotification !== 'undefined') {
        EmailNotification.sendReminderEmails();
    }
}

// Auto send reminders every day at 8 AM
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 8 && now.getMinutes() === 0) {
        sendReminderEmails();
    }
}, 60000); // Check every minute 