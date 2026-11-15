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

// Fetch a Vimeo thumbnail from the video URL via the oEmbed API so it stays
// in sync automatically. Falls back to the hardcoded thumbnail on error.
async function loadVimeoThumbnails() {
    const videoLinks = document.querySelectorAll('.video-link[href*="vimeo.com"]');
    if (videoLinks.length === 0) return;

    for (const link of videoLinks) {
        const img = link.querySelector('img');
        if (!img) continue;
        try {
            const response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(link.href)}`);
            if (!response.ok) continue;
            const data = await response.json();
            if (data.thumbnail_url) {
                // Request a larger thumbnail than the default oEmbed size
                img.src = data.thumbnail_url.replace(/_\d+x\d+/, '_1280x720');
                img.alt = img.alt || `${data.title} Thumbnail`;
            }
        } catch (err) {
            console.warn('Could not load Vimeo thumbnail:', err);
        }
    }
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
        const projectLinks = document.querySelectorAll('.actor-project-item a, .actor-featured-card'); // Select the <a> elements
        const popup = document.querySelector('.video-popup');
        const closeBtn = document.querySelector('.close-video');
        const iframe = document.querySelector('.video-popup iframe');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent the link from navigating
                console.log('Video link clicked');
                const videoId = this.getAttribute('data-video-id'); // Get the video ID from the data attribute
                let embedUrl;
                if (this.href.includes('vimeo.com')) {
                    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
                } else {
                    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                }
                iframe.src = embedUrl;
                popup.classList.add('active');
            });
        });
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('active');
                iframe.src = '';
            });
        }
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                iframe.src = '';
            }
        });

        // Enlarge buttons + lightbox for character images
        const lightbox = document.getElementById('imageLightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeImage = document.querySelector('.close-image');
        function openLightbox(src, alt) {
            if (!lightbox || !lightboxImg) return;
            lightboxImg.src = src;
            lightboxImg.alt = alt || '';
            lightbox.classList.add('active');
        }
        function closeLightbox() {
            if (lightbox) lightbox.classList.remove('active');
            if (lightboxImg) lightboxImg.src = '';
        }
        if (closeImage) closeImage.addEventListener('click', closeLightbox);
        if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) closeLightbox(); });

        const addEnlargeBtn = (container, img) => {
            if (!img) return;
            const btn = document.createElement('button');
            btn.className = 'actor-enlarge-btn';
            btn.type = 'button';
            btn.setAttribute('aria-label', 'View larger image');
            btn.textContent = '⤢';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
            });
            container.appendChild(btn);
        };

        document.querySelectorAll('.actor-project-item').forEach(item => {
            const charSlot = item.querySelector('.actor-slot--char');
            const charImg = charSlot ? charSlot.querySelector('.actor-slot-img') : null;
            if (charSlot && charImg) {
                addEnlargeBtn(charSlot, charImg);
            } else {
                const posterSlot = item.querySelector('.actor-slot--poster');
                const posterImg = posterSlot ? posterSlot.querySelector('.actor-slot-img') : null;
                if (posterSlot && posterImg) addEnlargeBtn(posterSlot, posterImg);
            }
        });
        document.querySelectorAll('.actor-featured-card').forEach(card => {
            addEnlargeBtn(card, card.querySelector('.actor-featured-thumb'));
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

    // Theme toggle
    (function () {
        var btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle color theme');
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        btn.textContent = current === 'dark' ? '☀' : '☾';
        btn.addEventListener('click', function () {
            var now = document.documentElement.getAttribute('data-theme') || 'dark';
            var next = now === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            btn.textContent = next === 'dark' ? '☀' : '☾';
        });
        document.body.appendChild(btn);
    })();

    loadVimeoThumbnails();

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
                let embedUrl;
                if (this.href.includes('vimeo.com')) {
                    const videoId = this.href.split('/').pop();
                    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
                } else {
                    const videoId = this.href.split('v=')[1];
                    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                }
                iframe.src = embedUrl;
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
   
});