document.addEventListener('DOMContentLoaded', function() {
    const jobForm = document.getElementById('jobForm');

    jobForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('jobTitle').value;
        const description = document.getElementById('jobDescription').value;
        const salary = document.getElementById('jobSalary').value;
        const experience = document.getElementById('jobExperience').value;
        const incentive = document.getElementById('jobIncentive').value;
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser || loggedInUser.role !== 'recruiter') {
            alert('You must be logged in as a recruiter to post a job.');
            return;
        }

        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        jobs.push({
            title,
            description,
            salary,
            experience,
            incentive,
            jobPosterEmail: loggedInUser.email // Store the email of the recruiter who posted the job
        });

        localStorage.setItem('jobs', JSON.stringify(jobs));
        alert('Job posted successfully!');
        window.location.href = 'recruiter-dashboard.html';
    });
});
