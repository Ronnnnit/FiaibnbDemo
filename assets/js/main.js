// Global variables
let currentUser = null;
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
    updateCartCount();
    setupMobileNav();
});

// Initialize authentication state
function initializeAuth() {
    const savedUser = localStorage.getItem('fairbnb_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateNavbar();
    }
}

// Update navbar based on auth state
function updateNavbar() {
    const authSection = document.getElementById('auth-section');
    const authLink = document.getElementById('auth-link');
    
    if (currentUser) {
        authSection.innerHTML = `
            <span class="user-name">Hi, ${currentUser.name}</span>
            <a href="#" class="nav-link" onclick="signOut()">Sign Out</a>
        `;
    } else {
        authSection.innerHTML = `
            <a href="signin.html" class="nav-link" id="auth-link">Sign In</a>
        `;
    }
}

// Sign out function
function signOut() {
    localStorage.removeItem('fairbnb_user');
    currentUser = null;
    showAlert('Signed out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Update cart count in navbar
function updateCartCount() {
    const cartData = localStorage.getItem('fairbnb_cart');
    cart = cartData ? JSON.parse(cartData) : [];
    
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Setup mobile navigation
function setupMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

// Show alert messages
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insert at the top of main content
    const main = document.querySelector('main') || document.body;
    main.insertBefore(alert, main.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
}

// Add to cart function (global)
function addToCart(packageId) {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;
    
    const existingItem = cart.find(item => item.id === packageId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: packageId,
            title: pkg.title,
            location: pkg.location,
            price: pkg.price,
            image: pkg.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('fairbnb_cart', JSON.stringify(cart));
    updateCartCount();
    showAlert('Package added to cart!', 'success');
}

// Format currency in INR
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Check if user is logged in
function requireAuth() {
    if (!currentUser) {
        showAlert('Please sign in to access this feature.', 'error');
        setTimeout(() => {
            window.location.href = 'signin.html';
        }, 1500);
        return false;
    }
    return true;
}

// Session management
function saveUserSession(user) {
    currentUser = user;
    localStorage.setItem('fairbnb_user', JSON.stringify(user));
    updateNavbar();
}

// Generate unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
