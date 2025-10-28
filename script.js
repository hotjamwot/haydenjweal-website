function openVideo(videoUrl) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    iframe.src = videoUrl;
    modal.classList.add('active');
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalVideo');
    iframe.src = '';
    modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
    // Add keyboard handler for video modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeVideo();
        }
    });
    // Add click handler for video modal background
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideo();
            }
        });
    }
     // Actor page specific code
     if (document.querySelector('.actor-project-item')) {  // Check if the actor page elements exist
        const projectLinks = document.querySelectorAll('.actor-project-item a'); // Select the <a> elements
        const popup = document.querySelector('.video-popup');
        const closeBtn = document.querySelector('.close-video');
        const iframe = document.querySelector('.video-popup iframe');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent the link from navigating
                console.log('Video link clicked');
                const videoId = this.getAttribute('data-video-id'); // Get the video ID from the data attribute
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

   // Writer page specific code - script dropdown menu
   const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
   if (dropdownButtons.length > 0) {
       dropdownButtons.forEach(button => {
           button.addEventListener('click', (e) => {
               e.preventDefault();
               e.stopPropagation();
               const dropdown = button.nextElementSibling;
               
               // Close all other dropdowns first
               document.querySelectorAll('.dropdown-content').forEach(content => {
                   if (content !== dropdown) {
                       content.style.display = 'none';
                   }
               });
               
               // Toggle current dropdown
               dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
           });
       });

       // Close dropdown when clicking outside
       document.addEventListener('click', (e) => {
           if (!e.target.closest('.script-dropdown')) {
               document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                   dropdown.style.display = 'none';
               });
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