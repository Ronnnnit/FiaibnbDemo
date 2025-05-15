// Booking history page functionality
document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;
    loadBookingHistory();
});

// Mock booking data for demo purposes
const mockBookings = [
    {
        id: 'BK001',
        title: "Goa Beach Escape",
        location: "Goa, India",
        date: "2024-12-21",
        price: 24999,
        status: "Completed",
        packages: [{
            id: 1,
            title: "Goa Beach Escape",
            location: "Goa, India",
            price: 24999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop"
        }],
        total: 24999
    },
    {
        id: 'BK002',
        title: "Kerala Backwaters Tour",
        location: "Kerala, India",
        date: "2024-11-15",
        price: 34999,
        status: "Completed",
        packages: [{
            id: 2,
            title: "Kerala Backwaters Tour",
            location: "Kerala, India",
            price: 34999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop"
        }],
        total: 34999
    },
    {
        id: 'BK003',
        title: "Rajasthan Royal Experience",
        location: "Rajasthan, India",
        date: "2024-10-10",
        price: 45999,
        status: "Completed",
        packages: [{
            id: 3,
            title: "Rajasthan Royal Experience",
            location: "Rajasthan, India",
            price: 45999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1599661046827-dacde84adc3c?w=400&h=300&fit=crop"
        }],
        total: 45999
    },
    {
        id: 'BK004',
        title: "Himalayan Adventure Trek",
        location: "Himachal Pradesh, India",
        date: "2024-09-05",
        price: 29999,
        status: "Pending",
        packages: [{
            id: 4,
            title: "Himalayan Adventure Trek",
            location: "Himachal Pradesh, India",
            price: 29999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        }],
        total: 29999
    },
    {
        id: 'BK005',
        title: "South India Cultural Tour",
        location: "Tamil Nadu, India",
        date: "2024-08-20",
        price: 32999,
        status: "Completed",
        packages: [{
            id: 5,
            title: "South India Cultural Tour",
            location: "Tamil Nadu, India",
            price: 32999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop"
        }],
        total: 32999
    },
    {
        id: 'BK006',
        title: "Mumbai City Break",
        location: "Mumbai, India",
        date: "2024-07-12",
        price: 18999,
        status: "Cancelled",
        packages: [{
            id: 6,
            title: "Mumbai City Break",
            location: "Mumbai, India",
            price: 18999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop"
        }],
        total: 18999
    },
    {
        id: 'BK007',
        title: "Andaman Islands Paradise",
        location: "Andaman & Nicobar, India",
        date: "2024-06-25",
        price: 39999,
        status: "Completed",
        packages: [{
            id: 7,
            title: "Andaman Islands Paradise",
            location: "Andaman & Nicobar, India",
            price: 39999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
        }],
        total: 39999
    },
    {
        id: 'BK008',
        title: "Northeast India Explorer",
        location: "Meghalaya, India",
        date: "2024-05-30",
        price: 27999,
        status: "Pending",
        packages: [{
            id: 8,
            title: "Northeast India Explorer",
            location: "Meghalaya, India",
            price: 27999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&h=300&fit=crop"
        }],
        total: 27999
    },
    {
        id: 'BK009',
        title: "Golden Triangle Tour",
        location: "Delhi-Agra-Jaipur, India",
        date: "2024-04-15",
        price: 22999,
        status: "Completed",
        packages: [{
            id: 9,
            title: "Golden Triangle Tour",
            location: "Delhi-Agra-Jaipur, India",
            price: 22999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1564507592333-c60c67bb5b88?w=400&h=300&fit=crop"
        }],
        total: 22999
    },
    {
        id: 'BK010',
        title: "Leh Ladakh Expedition",
        location: "Ladakh, India",
        date: "2024-03-08",
        price: 35999,
        status: "Cancelled",
        packages: [{
            id: 10,
            title: "Leh Ladakh Expedition",
            location: "Ladakh, India",
            price: 35999,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        }],
        total: 35999
    }
];

// Load and render booking history
function loadBookingHistory() {
    // Simulate API call with setTimeout
    const loadingElement = showLoading();
    
    setTimeout(() => {
        loadingElement.remove();
        
        // Get actual bookings from localStorage
        const actualHistory = JSON.parse(localStorage.getItem('fairbnb_history') || '[]');
        const userActualHistory = actualHistory.filter(booking => booking.userId === currentUser.id);
        
        // Always show mock bookings for demo purposes
        // Remove the user filter to show all mock bookings
        const demoBookings = mockBookings.map(booking => ({
            ...booking,
            userId: currentUser.id // Assign to current user for display
        }));
        
        // Combine actual and mock bookings
        const combinedHistory = [...userActualHistory, ...demoBookings];
        
        renderHistory(combinedHistory);
    }, 1000);
}

// Show loading indicator
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-container';
    loadingDiv.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading your booking history...</p>
        </div>
    `;
    
    const container = document.querySelector('.container');
    container.appendChild(loadingDiv);
    
    return loadingDiv;
}

// Render booking history
function renderHistory(bookings) {
    const historyContent = document.getElementById('history-content');
    const emptyHistory = document.getElementById('empty-history');
    
    if (bookings.length === 0) {
        historyContent.style.display = 'none';
        emptyHistory.style.display = 'block';
        return;
    }
    
    historyContent.style.display = 'block';
    emptyHistory.style.display = 'none';
    
    // Sort bookings by date (newest first)
    bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    historyContent.innerHTML = bookings.map(booking => `
        <div class="history-item">
            <div class="history-header">
                <div>
                    <h3>Booking #${booking.id}</h3>
                    <p class="history-date">${formatDate(booking.date)}</p>
                    <div class="booking-status status-${booking.status?.toLowerCase() || 'completed'}">
                        ${booking.status || 'Completed'}
                    </div>
                </div>
                <div class="history-total">${formatCurrency(booking.total)}</div>
            </div>
            <div class="history-packages">
                ${booking.packages.map(pkg => `
                    <div class="history-package">
                        <div class="history-package-info">
                            <div class="package-image-small" style="background-image: url('${pkg.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'}')"></div>
                            <div class="package-details">
                                <h4>${pkg.title}</h4>
                                <p>${pkg.location} - Quantity: ${pkg.quantity}</p>
                            </div>
                        </div>
                        <div class="history-package-actions">
                            <div class="history-package-price">${formatCurrency(pkg.price * pkg.quantity)}</div>
                            ${(booking.status || 'Completed') === 'Completed' ? 
                                `<button class="rebook-btn" onclick="rebookPackage('${pkg.title}', '${pkg.location}', ${pkg.price})">Rebook</button>` : 
                                ''
                            }
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Rebook a package
function rebookPackage(title, location, price) {
    // Find if the package exists in the main packages array
    let pkg = packages.find(p => p.title === title || p.location === location);
    
    // If not found, use the booking data to add to cart
    if (!pkg) {
        // Create a temporary package object for rebooking
        const tempPackage = {
            id: Math.floor(Math.random() * 1000) + 100,
            title: title,
            location: location,
            price: price,
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
            description: `Rebook your amazing ${title} experience.`
        };
        
        // Add to cart directly
        const existingItem = cart.find(item => item.title === title);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: tempPackage.id,
                title: tempPackage.title,
                location: tempPackage.location,
                price: tempPackage.price,
                image: tempPackage.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('fairbnb_cart', JSON.stringify(cart));
        updateCartCount();
        showAlert(`${title} added to cart!`, 'success');
    } else {
        // Use the existing addToCart function
        addToCart(pkg.id);
    }
}
