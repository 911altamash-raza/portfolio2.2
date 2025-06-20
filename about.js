document.addEventListener('DOMContentLoaded', function() {
    // Video background fallback
    const video = document.getElementById('background-video');
    if (video) {
        // Check if video can play, otherwise show poster
        video.addEventListener('error', function() {
            video.style.display = 'none';
            document.body.style.background = 'linear-gradient(135deg, #1b1b2f, #162447)';
        });
        
        // Attempt to play video (some browsers block autoplay)
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Auto-play was prevented, show poster instead
                video.poster = 'assets/fallback.webp';
                video.load();
            });
        }
    }

    // Focus styles for keyboard navigation
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-focus');
        }
    });

    document.addEventListener('mousedown', function() {
        document.documentElement.classList.remove('keyboard-focus');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}