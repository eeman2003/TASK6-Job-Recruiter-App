document.addEventListener('DOMContentLoaded', function() {
    const recruiterTableBody = document.querySelector('#recruiterTable tbody');

    // Load pending recruiters and users from localStorage
    let pendingRecruiters = JSON.parse(localStorage.getItem('pendingRecruiters')) || [];
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Function to save pending recruiters to localStorage
    function savePendingRecruitersToLocalStorage() {
        localStorage.setItem('pendingRecruiters', JSON.stringify(pendingRecruiters));
    }

    // Function to save users to localStorage
    function saveUsersToLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Function to render recruiters in the table
    function renderRecruiters() {
        recruiterTableBody.innerHTML = '';
        pendingRecruiters.forEach((recruiter, index) => {
            if (recruiter.role === "recruiter") {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${recruiter.name}</td>
                    <td>${recruiter.email}</td>
                    <td>
                        <button class="approve-btn" onclick="approveRecruiter(${index})">Approve</button>
                        <button class="reject-btn" onclick="rejectRecruiter(${index})">Reject</button>
                    </td>
                `;
                recruiterTableBody.appendChild(row);
            }
        });
    }

    // Function to approve recruiter
    window.approveRecruiter = function(index) {
        const recruiter = pendingRecruiters[index];
        recruiter.approved = true; // Set the recruiter as approved

        // Move the recruiter to the users list
        users.push(recruiter);
        saveUsersToLocalStorage(users); // Save the updated users array to localStorage

        // Remove the recruiter from the pendingRecruiters list
        pendingRecruiters.splice(index, 1);
        savePendingRecruitersToLocalStorage(pendingRecruiters); // Save the updated pendingRecruiters to localStorage

        alert(`${recruiter.name} has been approved!`);
        renderRecruiters(); // Re-render the table
    };

    // Function to reject recruiter
    window.rejectRecruiter = function(index) {
        alert(`${pendingRecruiters[index].name} has been rejected.`);
        pendingRecruiters.splice(index, 1); // Remove recruiter from the list
        savePendingRecruitersToLocalStorage(pendingRecruiters); // Save updated list to localStorage
        renderRecruiters(); // Re-render the table
    };

    // Initial render
    renderRecruiters();

    

});
