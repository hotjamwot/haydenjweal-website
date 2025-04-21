document.addEventListener('DOMContentLoaded', function () {
    // General page logic for columns
    const columns = document.querySelectorAll('.column');
    
    if (columns.length > 0) {
        // Home page specific code
        columns.forEach(column => {
            column.addEventListener('click', function () {
                const role = this.id.split('-')[0];
                console.log(`Navigating to ${role} page`);
            });
        });

        // View buttons logic
        const viewButtons = document.querySelectorAll('.view-work');
        viewButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.stopPropagation();
                const role = this.closest('.column').id.split('-')[0];
                window.location.href = `${role}.html`;
            });
        });

        // Quote hover animations
        columns.forEach(column => {
            const quote = column.querySelector('.quote');
            column.addEventListener('mouseenter', () => {
                quote.style.transform = 'translateY(0)';
                quote.style.opacity = '1';
            });
            column.addEventListener('mouseleave', () => {
                quote.style.transform = 'translateY(20px)';
                quote.style.opacity = '0.8';
            });
        });
    }

    // Editor page specific code
    if (document.querySelector('.video-popup')) {
        const videoLinks = document.querySelectorAll('.video-link');
        const popup = document.querySelector('.video-popup');
        const closeBtn = document.querySelector('.close-video');
        const iframe = document.querySelector('.video-popup iframe');

        videoLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Video link clicked');
                const videoId = this.href.split('v=')[1];
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                popup.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            iframe.src = '';
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                iframe.src = '';
            }
        });
    }

    // Director page specific code
    if (document.body.classList.contains('career-page')) {
        const infoBox = document.getElementById('info-box');
        if (infoBox) {
            document.querySelectorAll('.project').forEach(project => {
                // ...existing director page code...
            });
        }
    }
});