document.addEventListener('DOMContentLoaded', function() {
    const notificationsList = document.getElementById('notificationsList');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('You must be logged in as a recruiter to view notifications.');
        return;
    }

    // Load notifications from localStorage
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    // Filter notifications for the logged-in user
    notifications = notifications.filter(notification => notification.email === loggedInUser.email);

    if (notifications.length === 0) {
        notificationsList.innerHTML = '<p>No new notifications.</p>';
        return;
    }

    notificationsList.innerHTML = notifications.map(notification => `
        <div class="notification-item">
            <p>${notification.message}</p>
        </div>
    `).join('');

    // Clear notifications after displaying them (if desired)
    localStorage.setItem('notifications', JSON.stringify(notifications.filter(notification => notification.email !== loggedInUser.email)));
});
