document.addEventListener('DOMContentLoaded', function() {
    const jobTitle = new URLSearchParams(window.location.search).get('title');
    const jobTitleElement = document.getElementById('jobTitle');
    const jobDescriptionElement = document.getElementById('jobDescription');
    const jobSalaryElement = document.getElementById('jobSalary');
    const jobExperienceElement = document.getElementById('jobExperience');
    const jobIncentiveElement = document.getElementById('jobIncentive');
    const applyBtn = document.getElementById('applyBtn');

    if (!applyBtn) {
        console.error('Apply button not found.');
        return;
    }

    // Load job data from localStorage
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const job = jobs.find(job => job.title === jobTitle);

    if (job) {
        jobTitleElement.textContent = job.title;
        jobDescriptionElement.textContent = job.description;
        jobSalaryElement.textContent = `${job.salary} PKR`;
        jobExperienceElement.textContent = `${job.experience} years`;
        jobIncentiveElement.textContent = `${job.incentive}`;
    } else {
        jobTitleElement.textContent = 'Job not found.';
        jobDescriptionElement.textContent = '';
        jobSalaryElement.textContent = '';
        jobExperienceElement.textContent = '';
        jobIncentiveElement.textContent = '';
    }

    applyBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to apply for this job?')) {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser && loggedInUser.role === 'recruiter') {
                let applications = JSON.parse(localStorage.getItem('applications')) || [];
                applications.push({ jobTitle: job.title, recruiterEmail: loggedInUser.email });
                localStorage.setItem('applications', JSON.stringify(applications));
                alert('Application submitted successfully!');
            } else {
                alert('You need to be logged in as a recruiter to apply for a job.');
            }
        }
    });
});
