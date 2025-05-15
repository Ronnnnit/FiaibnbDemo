// Authentication functionality
document.addEventListener('DOMContentLoaded', () => {
    setupAuthForms();
});

// Setup authentication forms
function setupAuthForms() {
    const signinForm = document.getElementById('signin-form');
    const registerForm = document.getElementById('register-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignIn);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Handle sign in
async function handleSignIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!validateEmail(email)) {
        showAuthMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (!password) {
        showAuthMessage('Please enter your password', 'error');
        return;
    }
    
    // Check for test account
    if (email === 'test@example.com' && password === 'test123') {
        const testUser = {
            id: 'test-user',
            name: 'Test User',
            email: email
        };
        saveUserSession(testUser);
        showAuthMessage('Welcome back!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
        return;
    }
    
    // Check stored users
    const users = JSON.parse(localStorage.getItem('fairbnb_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const userSession = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        saveUserSession(userSession);
        showAuthMessage('Welcome back!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showAuthMessage('Invalid email or password', 'error');
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Validate inputs
    let isValid = true;
    
    if (!name.trim()) {
        showFieldError('name', 'Name is required');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (password.length < 6) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        showFieldError('confirm-password', 'Passwords do not match');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('fairbnb_users') || '[]');
    if (users.find(u => u.email === email)) {
        showAuthMessage('An account with this email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name: name.trim(),
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('fairbnb_users', JSON.stringify(users));
    
    // Sign in the new user
    const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
    };
    saveUserSession(userSession);
    
    showAuthMessage('Account created successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show authentication message
function showAuthMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert before form
    const form = document.querySelector('.auth-form form');
    form.parentNode.insertBefore(messageDiv, form);
}

// Show field-specific error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Clear all error messages
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
