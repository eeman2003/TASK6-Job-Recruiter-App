document.addEventListener('DOMContentLoaded', function() {
    const applicationsList = document.getElementById('applicationsList');

    // Load applications and logged-in user from localStorage
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('You must be logged in as a recruiter to view applications.');
        return;
    }

    // Filter applications for jobs posted by the logged-in recruiter
    const myJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const myJobTitles = myJobs
        .filter(job => job.jobPosterEmail === loggedInUser.email)
        .map(job => job.title);

    applications = applications.filter(app => myJobTitles.includes(app.jobTitle));

    if (applications.length === 0) {
        applicationsList.innerHTML = '<p>No applications for your jobs.</p>';
        return;
    }

    applicationsList.innerHTML = applications.map(app => `
        <div class="application-item">
            <p><strong>Job Title:</strong> ${app.jobTitle}</p>
            <p><strong>Applicant Email:</strong> ${app.recruiterEmail}</p>
            <button class="btn btn-approve" onclick="handleApplication('${app.jobTitle}', '${app.recruiterEmail}', true)">Approve</button>
            <button class="btn btn-reject" onclick="handleApplication('${app.jobTitle}', '${app.recruiterEmail}', false)">Reject</button>
        </div>
    `).join('');

    window.handleApplication = function(jobTitle, applicantEmail, approved) {
        // Load applications, job data, and notifications from localStorage
        let applications = JSON.parse(localStorage.getItem('applications')) || [];
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        
        // Remove the processed application
        applications = applications.filter(app => !(app.jobTitle === jobTitle && app.recruiterEmail === applicantEmail));
        localStorage.setItem('applications', JSON.stringify(applications));
        
        if (approved) {
            // Find the job to calculate incentives
            const job = jobs.find(job => job.title === jobTitle);
            
            if (job) {
                const totalIncentive = job.incentive;
                const adminShare = totalIncentive * 0.20;
                const recruiterJobShare = totalIncentive * 0.40;
                const recruiterCandidateShare = totalIncentive * 0.40;
    
                // Notify the applicant
                notifications.push({
                    email: applicantEmail,
                    message: `Your application for the job "${jobTitle}" has been approved! An interview will be scheduled.\n\n
                    Admin Share: ${adminShare} PKR\n
                    Recruiter Job Share: ${recruiterJobShare} PKR\n
                    Recruiter Candidate Share: ${recruiterCandidateShare} PKR`
                });
    
                alert(`Application approved! An interview will be scheduled.\n\n
                    Admin Share: ${adminShare} PKR\n
                    Recruiter Job Share: ${recruiterJobShare} PKR\n
                    Recruiter Candidate Share: ${recruiterCandidateShare} PKR`);
                
            } else {
                alert('Job details not found.');
            }
    
        } else {
            // Notify the applicant of rejection
            notifications.push({
                email: applicantEmail,
                message: `Your application for the job "${jobTitle}" has been rejected.`
            });
    
            alert('Application rejected.');
        }
    
        // Save notifications
        localStorage.setItem('notifications', JSON.stringify(notifications));
    
        // Optionally, you could add logic here to update any other relevant data
        // For example, updating job listings or recruiter data if necessary
    };

        // Save the updated job list if needed
        localStorage.setItem('jobs', JSON.stringify(jobs));
    
});
