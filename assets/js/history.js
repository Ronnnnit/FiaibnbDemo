
// Select container matching your HTML
const container = document.querySelector('#history-content');
const emptyHistory = document.querySelector('#empty-history');

function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = '<p>Loading booking history...</p>';
    container.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = container.querySelector('.loading');
    if (loadingDiv) container.removeChild(loadingDiv);
}

function renderBooking(booking) {
    const bookingDiv = document.createElement('div');
    bookingDiv.className = 'history-item';
    bookingDiv.dataset.id = booking._id; // useful for removal
    console.log("booking id is :", booking._id);

    const packageDetails = booking.packages.map(pkg => `
        <div class="history-package">
            <img src="${pkg.image}" alt="${pkg.title}" class="history-image" />
            <div>
                <h4>${pkg.title}</h4>
                <p>Location: ${pkg.location}</p>
                <p>Quantity: ${pkg.quantity}</p>
                <p>Duration: ${pkg.id} days</p>
                <p>Booking Id: ${booking._id}</p>
                <p>Price: ₹${pkg.price}</p>
            </div>
        </div>
    `).join('');

    bookingDiv.innerHTML = `
        <h3>Booking on ${new Date(booking.date).toLocaleString()}</h3>
        ${packageDetails}
        <p><strong>Total: ₹${booking.total}</strong></p>
        <button class="cancel-booking-btn" onclick="cancelBooking('${booking._id}')">Cancel Booking</button>
        <hr />
    `;

    container.appendChild(bookingDiv);
}

async function fetchBookingHistory(userId) {
    showLoading();
    try {
        // Example API endpoint - update if yours differs
        console.log('Fetched userId from localStorage:', userId);
        const response = await fetch(`http://localhost:3000/api/bookings?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch booking history');

        const bookings = await response.json();
        hideLoading();

        if (bookings.length === 0) {
            emptyHistory.style.display = 'block';
            return;
        }
        emptyHistory.style.display = 'none';

        bookings.forEach(renderBooking);
    } catch (error) {
        hideLoading();
        emptyHistory.style.display = 'block';
        emptyHistory.innerHTML = `<h2>Error loading booking history</h2><p>${error.message}</p>`;
    }
}
function init() {
    // Replace this with how you get the user id, e.g., from auth token or localStorage
    let tempid = localStorage.getItem('fairbnb_user');
    const userId = JSON.parse(tempid).id;

    if (!userId) {
        emptyHistory.style.display = 'block';
        emptyHistory.innerHTML = `<h2>Please sign in to see your booking history.</h2>`;
        return;
    }

    fetchBookingHistory(userId);
}
async function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?'))return;

    try {
        const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to cancel booking');

        showAlert('Booking cancelled successfully', 'info');

        // Remove booking from DOM
        const bookingElem = document.querySelector(`.history-item[data-id="${bookingId}"]`);
        if (bookingElem) bookingElem.remove();

    } catch (err) {
        console.error('Cancel error:', err);
        showAlert('Failed to cancel booking. Please try again.', 'error');
    }
}


// Run init when DOM loaded
document.addEventListener('DOMContentLoaded', init);
