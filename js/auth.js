document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    // Default admin user
    const defaultAdminUser = { email: 'admin@gmail.com', password: 'admin123', role: 'admin', approved: true };

    // Load users from localStorage or use an empty array if none exist
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the default admin user already exists in localStorage
    if (!users.some(user => user.email === defaultAdminUser.email)) {
        users.push(defaultAdminUser);
        saveUsersToLocalStorage(users);
    }

    // Save users to localStorage
    function saveUsersToLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Save function for pending recruiters
    function savePendingRecruitersToLocalStorage(pendingRecruiters) {
        localStorage.setItem('pendingRecruiters', JSON.stringify(pendingRecruiters));
    }

    if (signInForm) {
        signInForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
    
            // Reload users from localStorage in case they were updated
            users = JSON.parse(localStorage.getItem('users')) || [];
    
            // Check if user exists
            const user = users.find(user => user.email === email && user.password === password);
    
            if (user) {
                if (user.role === 'recruiter' && !user.approved) {
                    // Recruiter is not approved
                    alert('Your account is pending approval by an admin. Please try again later.');
                } else {
                    // Store logged-in user in localStorage
                    localStorage.setItem('loggedInUser', JSON.stringify(user));

                    // Successful login
                    alert('Login successful! Redirecting to your dashboard...');
                    if (user.role === 'admin') {
                        window.location.href = 'admin-dashboard.html'; // Admin dashboard
                    } else if (user.role === 'recruiter') {
                        window.location.href = 'recruiter-dashboard.html'; // Recruiter dashboard
                    }
                }
            } else {
                // Login failed
                alert('Invalid email or password. Please try again.');
            }
        });
    }

     // Save function for pending recruiters
     function savePendingRecruitersToLocalStorage(pendingRecruiters) {
        localStorage.setItem('pendingRecruiters', JSON.stringify(pendingRecruiters));
    }
    
    // Sign-Up Logic
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const role = document.getElementById('role').value;
            const approved = false;
    
            // Simple validation
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            // Initialize users and pendingRecruiters from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let pendingRecruiters = JSON.parse(localStorage.getItem('pendingRecruiters')) || [];
    
            // Check if user already exists in both users and pendingRecruiters
            const userExists = users.some(user => user.email === email);
            const pendingUserExists = pendingRecruiters.some(user => user.email === email);
    
            if (userExists || pendingUserExists) {
                alert('Email already registered. Please sign in.');
            } else {
                // Register new recruiter to pendingRecruiters if role is recruiter
                if (role === 'recruiter') {
                    pendingRecruiters.push({ name, email, password, role, approved });
                    savePendingRecruitersToLocalStorage(pendingRecruiters); // Save to pendingRecruiters in localStorage
                    alert('Registration successful! Your account is pending approval.');
                } else {
                    // Register new user (non-recruiter) directly to users array
                    users.push({ name, email, password, role, approved: true }); // Non-recruiter accounts are automatically approved
                    saveUsersToLocalStorage(users); // Save updated users array to localStorage
                    alert('Registration successful! Redirecting to sign-in page...');
                    window.location.href = 'sign-in.html';
                }
            }
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Remove the logged-in user from localStorage
            localStorage.removeItem('loggedInUser');

            // Redirect to the sign-in page
            window.location.href = 'sign-in.html';
        });
    }
    
   
    // Save function for users
   
    
});
