document.getElementById('postJobBtn').addEventListener('click', function() {
    // Redirect to the Post a Job page
    window.location.href = 'post-job.html';
});

document.getElementById('viewJobsBtn').addEventListener('click', function() {
    // Display a list of posted jobs dynamically
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '<p>Loading jobs...</p>';

    // Simulate fetching job data
    setTimeout(() => {
        // Get the jobs from local storage
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

        // Clear the job list
        jobList.innerHTML = '';

        if (jobs.length === 0) {
            jobList.innerHTML = '<p>No jobs posted yet.</p>';
        } else {
            // Create HTML for each job
            jobs.forEach(job => {
                const jobItem = `
                    <div class="job-item">
                        <h3>${job.title}</h3>
                        <p>Salary: ${job.salary} PKR</p>
                        <button class="btn" onclick="viewJobDetails('${job.title}')">View Details</button>
                    </div>
                `;
                jobList.innerHTML += jobItem;
            });
        }
    }, 1000);
});

function viewJobDetails(jobTitle) {
    // Redirect to the Job Details page with job title as a parameter
    window.location.href = `job-details.html?title=${encodeURIComponent(jobTitle)}`;
}
