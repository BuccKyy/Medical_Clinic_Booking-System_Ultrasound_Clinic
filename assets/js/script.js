// Medical Booking Website JavaScript

// Global variables
let currentStep = 1;
let bookingData = {
    service: '',
    doctor: '',
    date: '',
    time: '',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientAge: '',
    patientAddress: '',
    patientNotes: ''
};

// Doctor data based on service
const doctorsByService = {
    'ultrasound-general': [
        { id: 'dr-duc', name: 'BS. Trần Trung Đức (Nam - Đeo kính)', specialty: 'Siêu Âm Tổng Quát', gender: 'male' },
        { id: 'dr-phuong', name: 'BS. Trần Thanh Phương (Nữ - Tóc dài)', specialty: 'Siêu Âm Tổng Quát', gender: 'female' }
    ],
    'ultrasound-obstetrics': [
        { id: 'dr-duc', name: 'BS. Trần Trung Đức (Nam - Đeo kính)', specialty: 'Siêu Âm Sản - Phụ Khoa', gender: 'male' },
        { id: 'dr-phuong', name: 'BS. Trần Thanh Phương (Nữ - Tóc dài)', specialty: 'Siêu Âm Sản - Phụ Khoa', gender: 'female' }
    ],
    'ultrasound-cardio': [
        { id: 'dr-duc', name: 'BS. Trần Trung Đức (Nam - Đeo kính)', specialty: 'Siêu Âm Tim - Mạch Máu', gender: 'male' },
        { id: 'dr-phuong', name: 'BS. Trần Thanh Phương (Nữ - Tóc dài)', specialty: 'Siêu Âm Tim - Mạch Máu', gender: 'female' }
    ],
    'ultrasound-ortho': [
        { id: 'dr-duc', name: 'BS. Trần Trung Đức (Nam - Đeo kính)', specialty: 'Siêu Âm Cơ - Xương - Khớp', gender: 'male' },
        { id: 'dr-phuong', name: 'BS. Trần Thanh Phương (Nữ - Tóc dài)', specialty: 'Siêu Âm Cơ - Xương - Khớp', gender: 'female' }
    ],
    'additional-services': [
        { id: 'dr-duc', name: 'BS. Trần Trung Đức (Nam - Đeo kính)', specialty: 'Dịch Vụ Kèm Theo', gender: 'male' },
        { id: 'dr-phuong', name: 'BS. Trần Thanh Phương (Nữ - Tóc dài)', specialty: 'Dịch Vụ Kèm Theo', gender: 'female' }
    ],
    'regular-checkup': [
        { id: 'dr-duc', name: 'BS. Trần Trung Đức (Nam - Đeo kính)', specialty: 'Khám Định Kỳ', gender: 'male' },
        { id: 'dr-phuong', name: 'BS. Trần Thanh Phương (Nữ - Tóc dài)', specialty: 'Khám Định Kỳ', gender: 'female' }
    ]
};

// Available time slots
const availableTimes = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeBooking();
    setupEventListeners();
    setMinDate();
});

// Initialize booking form
function initializeBooking() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointment-date').min = today;
    
    // Populate time slots
    populateTimeSlots();
}

// Setup event listeners
function setupEventListeners() {
    // Service selection change
    document.getElementById('service-select').addEventListener('change', function() {
        const selectedService = this.value;
        bookingData.service = selectedService;
        populateDoctors(selectedService);
    });

    // Doctor selection change
    document.getElementById('doctor-select').addEventListener('change', function() {
        bookingData.doctor = this.value;
    });

    // Date selection change
    document.getElementById('appointment-date').addEventListener('change', function() {
        bookingData.date = this.value;
        updateAvailableTimes();
    });

    // Time selection change
    document.getElementById('appointment-time').addEventListener('change', function() {
        bookingData.time = this.value;
    });

    // Patient information fields
    document.getElementById('patient-name').addEventListener('input', function() {
        bookingData.patientName = this.value;
    });

    document.getElementById('patient-phone').addEventListener('input', function() {
        bookingData.patientPhone = this.value;
    });

    document.getElementById('patient-email').addEventListener('input', function() {
        bookingData.patientEmail = this.value;
    });

    document.getElementById('patient-age').addEventListener('input', function() {
        bookingData.patientAge = this.value;
    });

    document.getElementById('patient-address').addEventListener('input', function() {
        bookingData.patientAddress = this.value;
    });

    document.getElementById('patient-notes').addEventListener('input', function() {
        bookingData.patientNotes = this.value;
    });

    // Form submission
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitBooking();
    });

    // Patient information inputs
    const patientInputs = ['patient-name', 'patient-phone', 'patient-email', 'patient-age', 'patient-address', 'patient-notes'];
    patientInputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('input', function() {
            bookingData[inputId.replace('patient-', '')] = this.value;
        });
    });
}

// Set minimum date to today
function setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start from tomorrow
    
    const dateInput = document.getElementById('appointment-date');
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Populate doctors based on selected service
function populateDoctors(service) {
    const doctorSelect = document.getElementById('doctor-select');
    doctorSelect.innerHTML = '<option value="">-- Chọn bác sĩ --</option>';
    
    if (service && doctorsByService[service]) {
        doctorsByService[service].forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
        doctorSelect.disabled = false;
    } else {
        doctorSelect.disabled = true;
    }
}

// Populate time slots
function populateTimeSlots() {
    const timeSelect = document.getElementById('appointment-time');
    timeSelect.innerHTML = '<option value="">-- Chọn giờ --</option>';
    
    availableTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

// Update available times based on selected date
function updateAvailableTimes() {
    const selectedDate = document.getElementById('appointment-date').value;
    const timeSelect = document.getElementById('appointment-time');
    
    // Reset time selection
    timeSelect.value = '';
    
    if (selectedDate) {
        const dayOfWeek = new Date(selectedDate).getDay();
        
        // Filter times based on day of week
        let availableTimesForDay = [...availableTimes];
        
        // Saturday: only morning slots
        if (dayOfWeek === 6) {
            availableTimesForDay = availableTimes.filter(time => {
                const hour = parseInt(time.split(':')[0]);
                return hour < 12;
            });
        }
        
        // Sunday: no appointments
        if (dayOfWeek === 0) {
            timeSelect.innerHTML = '<option value="">Chủ nhật không làm việc</option>';
            timeSelect.disabled = true;
            return;
        }
        
        // Populate available times
        timeSelect.innerHTML = '<option value="">-- Chọn giờ --</option>';
        availableTimesForDay.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
        timeSelect.disabled = false;
    }
}

// Navigation between steps
function nextStep(step) {
    if (validateStep(step)) {
        currentStep = step + 1;
        showStep(currentStep);
        updateProgressBar();
    }
}

function prevStep(step) {
    currentStep = step - 1;
    showStep(currentStep);
    updateProgressBar();
}

// Show specific step
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(stepElement => {
        stepElement.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step-${step}`).classList.add('active');
    
    // Update confirmation details if on step 4
    if (step === 4) {
        updateConfirmationDetails();
    }
}

// Validate current step
function validateStep(step) {
    switch(step) {
        case 1:
            const service = document.getElementById('service-select').value;
            const doctor = document.getElementById('doctor-select').value;
            
            if (!service) {
                showError('Vui lòng chọn dịch vụ khám bệnh.');
                return false;
            }
            if (!doctor) {
                showError('Vui lòng chọn bác sĩ.');
                return false;
            }
            break;
            
        case 2:
            const date = document.getElementById('appointment-date').value;
            const time = document.getElementById('appointment-time').value;
            
            if (!date) {
                showError('Vui lòng chọn ngày khám.');
                return false;
            }
            if (!time) {
                showError('Vui lòng chọn giờ khám.');
                return false;
            }
            break;
            
        case 3:
            const name = document.getElementById('patient-name').value.trim();
            const phone = document.getElementById('patient-phone').value.trim();
            const email = document.getElementById('patient-email').value.trim();
            const age = document.getElementById('patient-age').value;
            const address = document.getElementById('patient-address').value.trim();
            
            if (!name) {
                showError('Vui lòng nhập họ và tên.');
                return false;
            }
            if (!phone) {
                showError('Vui lòng nhập số điện thoại.');
                return false;
            }
            if (!isValidPhone(phone)) {
                showError('Số điện thoại không hợp lệ.');
                return false;
            }
            if (!email) {
                showError('Vui lòng nhập email.');
                return false;
            }
            if (!isValidEmail(email)) {
                showError('Email không hợp lệ.');
                return false;
            }
            if (!age || age < 1 || age > 120) {
                showError('Vui lòng nhập tuổi hợp lệ (1-120).');
                return false;
            }
            if (!address) {
                showError('Vui lòng nhập địa chỉ.');
                return false;
            }
            break;
    }
    
    return true;
}

// Update confirmation details
function updateConfirmationDetails() {
    const serviceSelect = document.getElementById('service-select');
    const doctorSelect = document.getElementById('doctor-select');
    const dateInput = document.getElementById('appointment-date');
    const timeSelect = document.getElementById('appointment-time');
    
    // Get service name
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex]?.text || getServiceName(bookingData.service);
    
    // Get doctor name
    const doctorName = doctorSelect.options[doctorSelect.selectedIndex]?.text || getDoctorName(bookingData.doctor);
    
    // Format date
    const date = new Date(dateInput.value);
    const formattedDate = date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update confirmation details
    document.getElementById('confirm-service').textContent = `Dịch vụ: ${serviceName}`;
    document.getElementById('confirm-doctor').textContent = `Bác sĩ: ${doctorName}`;
    document.getElementById('confirm-date-time').textContent = `Thời gian: ${formattedDate} lúc ${timeSelect.value}`;
    
    document.getElementById('confirm-patient').textContent = `Họ tên: ${bookingData.patientName || 'Chưa nhập'}`;
    document.getElementById('confirm-contact').textContent = `Liên hệ: ${bookingData.patientPhone || 'Chưa nhập'} | ${bookingData.patientEmail || 'Chưa nhập'}`;
    document.getElementById('confirm-age').textContent = `Tuổi: ${bookingData.patientAge || 'Chưa nhập'}`;
    document.getElementById('confirm-address').textContent = `Địa chỉ: ${bookingData.patientAddress || 'Chưa nhập'}`;
    if (bookingData.patientNotes) {
        document.getElementById('confirm-notes').textContent = `Ghi chú: ${bookingData.patientNotes}`;
    }
}

// Submit booking
function submitBooking() {
    // Show loading state
    const submitBtn = document.querySelector('#step-4 button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Đang xử lý...';
    submitBtn.disabled = true;
    
    // Create appointment object
    const appointment = {
        id: Date.now(), // Simple ID generation
        patientName: bookingData.patientName,
        patientPhone: bookingData.patientPhone,
        patientEmail: bookingData.patientEmail,
        patientAge: bookingData.patientAge,
        patientAddress: bookingData.patientAddress,
        patientNotes: bookingData.patientNotes,
        service: bookingData.service,
        serviceName: getServiceName(bookingData.service),
        doctor: bookingData.doctor,
        doctorName: getDoctorName(bookingData.doctor),
        date: bookingData.date,
        time: bookingData.time,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Save appointment to localStorage
    saveAppointment(appointment);
    
    // Send email notification to doctor
    if (typeof EmailNotification !== 'undefined') {
        EmailNotification.notifyNewAppointment(appointment);
    }
    
    // Add to Google Sheet
    if (typeof GoogleSheets !== 'undefined') {
        GoogleSheets.addAppointmentToSheet(appointment);
    }
    
    // Add to Google Calendar
    if (typeof AdminAuth !== 'undefined' && AdminAuth.addAppointmentToCalendar) {
        AdminAuth.addAppointmentToCalendar(appointment);
    }
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccess('Đặt lịch thành công! Bác sĩ sẽ xác nhận và liên hệ với bạn trong thời gian sớm nhất.');
        
        // Reset form
        resetBookingForm();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

// Save appointment to localStorage
function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Get service name
function getServiceName(serviceCode) {
    const serviceNames = {
        'ultrasound-general': 'Siêu Âm Tổng Quát',
        'ultrasound-obstetrics': 'Siêu Âm Sản - Phụ Khoa',
        'ultrasound-cardio': 'Siêu Âm Tim - Mạch Máu',
        'ultrasound-ortho': 'Siêu Âm Cơ - Xương - Khớp',
        'additional-services': 'Dịch Vụ Kèm Theo',
        'regular-checkup': 'Khám Định Kỳ'
    };
    return serviceNames[serviceCode] || serviceCode;
}

// Get doctor name
function getDoctorName(doctorCode) {
    const doctorNames = {
        'dr-duc': 'BS. Trần Trung Đức (Nam - Đeo kính)',
        'dr-phuong': 'BS. Trần Thanh Phương (Nữ - Tóc dài)'
    };
    return doctorNames[doctorCode] || doctorCode;
}

// Reset booking form
function resetBookingForm() {
    // Reset form fields
    document.getElementById('booking-form').reset();
    
    // Reset booking data
    bookingData = {
        service: '',
        doctor: '',
        date: '',
        time: '',
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        patientAge: '',
        patientAddress: '',
        patientNotes: ''
    };
    
    // Reset to step 1
    currentStep = 1;
    showStep(1);
    updateProgressBar();
    
    // Reset doctor select
    document.getElementById('doctor-select').innerHTML = '<option value="">-- Chọn bác sĩ --</option>';
    document.getElementById('doctor-select').disabled = true;
}

// Update progress bar
function updateProgressBar() {
    const progress = (currentStep / 4) * 100;
    // You can add a progress bar element and update it here
}

// Validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Show error message
function showError(message) {
    // Remove existing messages
    removeMessages();
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${message}`;
    
    // Insert before the current step
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    currentStepElement.parentNode.insertBefore(errorDiv, currentStepElement);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show success message
function showSuccess(message) {
    // Remove existing messages
    removeMessages();
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
    
    // Insert at the top of the booking section
    const bookingSection = document.getElementById('booking');
    bookingSection.insertBefore(successDiv, bookingSection.firstChild);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 10000);
}

// Remove existing messages
function removeMessages() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(message => message.remove());
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type === 'submit') return;
        
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="loading"></span> Đang xử lý...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1000);
    });
});

// Add form validation on input
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
});

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Skip validation if field is empty (unless required)
    if (!value && !field.hasAttribute('required')) {
        return;
    }
    
    // Validate based on field type
    let isValid = true;
    
    switch(field.type) {
        case 'email':
            isValid = isValidEmail(value);
            break;
        case 'tel':
            isValid = isValidPhone(value);
            break;
        case 'number':
            if (field.id === 'patient-age') {
                isValid = value >= 1 && value <= 120;
            }
            break;
        default:
            isValid = value.length > 0;
    }
    
    // Add validation class
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
}

// Add CSS for validation states
const style = document.createElement('style');
style.textContent = `
    .is-valid {
        border-color: #28a745 !important;
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
`;
document.head.appendChild(style); 