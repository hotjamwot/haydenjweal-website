// JavaScript for enhancing the interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // General page logic for columns (if applicable on multiple pages)
    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
        column.addEventListener('click', function () {
            // Get the column id to determine which page to navigate to
            const role = this.id.split('-')[0];
            console.log(`Navigating to ${role} page`);
            // window.location.href = `${role}.html`;
        });
    });

    const viewButtons = document.querySelectorAll('.view-work');

    viewButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // prevents it from triggering the column click too
            const role = this.closest('.column').id.split('-')[0];
            window.location.href = `${role}.html`;
        });
    });

    // Add hover animation for quotes (optional enhancement)
    columns.forEach(column => {
        const quote = column.querySelector('.quote');

        column.addEventListener('mouseenter', function () {
            quote.style.transform = 'translateY(0)';
            quote.style.opacity = '1';
        });

        column.addEventListener('mouseleave', function () {
            quote.style.transform = 'translateY(20px)';
            quote.style.opacity = '0.8';
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Director Page-specific logic
        if (document.body.classList.contains('career-page')) {
            const infoBox = document.getElementById('info-box');
            
            document.querySelectorAll('.project').forEach(project => {
                project.addEventListener('mouseenter', function () {
                    const infoContent = project.querySelector('.project-info');
                    
                    // Get the info from the project
                    const title = infoContent.querySelector('h3').textContent;
                    const meta = infoContent.querySelector('.project-meta').textContent;
                    const description = infoContent.querySelector('.project-description').textContent;
    
                    // Update the info box content
                    infoBox.querySelector('h3').textContent = title;
                    infoBox.querySelector('p').textContent = meta;
                    infoBox.querySelector('p + p').textContent = description;
    
                    // Show the info box smoothly
                    infoBox.classList.add('show');
                });
    
                project.addEventListener('mouseleave', function () {
                    // Hide the info box smoothly
                    infoBox.classList.remove('show');
                });
            });
        }
    });
});
