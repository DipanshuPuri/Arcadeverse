document.addEventListener('DOMContentLoaded', () => { 
    console.log('DOM fully loaded and parsed');

    // Slideshow initialization
    const slideshowVideo = document.getElementById('slideshow-video');
    console.log('Slideshow video element:', slideshowVideo);

    if (slideshowVideo) {
        const videos = [
            "images/cardmemorymatch_animation.mp4",
            "images/tictactoe_animation.mp4",
            "images/typingmaster_animation.mp4",
            "images/snakerivals_animation.mp4"
        ];

        const indicators = document.querySelectorAll('.indicator');
        let currentIndex = 0;
        let isTransitioning = false;
        let isFirstVideoChange = true; // Flag to track if the first video change has occurred
        const fadeDuration = 1000; // Duration of fade transitions in milliseconds

        function changeVideo() {
            if (isTransitioning) return;

            isTransitioning = true;
            slideshowVideo.classList.add('fade-out');

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % videos.length;
                slideshowVideo.src = videos[currentIndex];
                slideshowVideo.play();
                slideshowVideo.classList.remove('fade-out');
                slideshowVideo.classList.add('fade-in');

                setTimeout(() => {
                    slideshowVideo.classList.remove('fade-in');
                    isTransitioning = false;

                    // Update indicators only after the first video change
                    if (!isFirstVideoChange) {
                        updateIndicators();
                    }
                }, fadeDuration);
            }, fadeDuration);

            // Update indicators immediately after initialization
            if (isFirstVideoChange) {
                isFirstVideoChange = false;
            }
        }

        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        function handleIndicatorClick(event) {
            console.log('Indicator clicked');

            if (isTransitioning) return;

            const clickedIndex = Array.from(indicators).indexOf(event.target);
            if (clickedIndex !== -1 && clickedIndex !== currentIndex) {
                currentIndex = clickedIndex;
                isTransitioning = true;

                slideshowVideo.classList.add('fade-out');

                setTimeout(() => {
                    slideshowVideo.src = videos[currentIndex];
                    slideshowVideo.play();
                    slideshowVideo.classList.remove('fade-out');
                    slideshowVideo.classList.add('fade-in');

                    setTimeout(() => {
                        slideshowVideo.classList.remove('fade-in');
                        isTransitioning = false;
                    }, fadeDuration);
                }, fadeDuration);

                updateIndicators();
            }
        }

        // Initialize the first video without updating indicators
        function initializeSlideshow() {
            slideshowVideo.src = videos[currentIndex];
            slideshowVideo.play();
        }

        initializeSlideshow();

        indicators.forEach(indicator => {
            console.log('Adding click listener');
            indicator.addEventListener('click', handleIndicatorClick);
        });

        setInterval(changeVideo, 3000); // Change video every 3 seconds
    } else {
        console.error('Slideshow video element not found');
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                console.log('Adding shrink class');
                navbar.classList.add('shrink');
            } else {
                console.log('Removing shrink class');
                navbar.classList.remove('shrink');
            }
        });
    } else {
        console.error('Navbar element not found');
    }

    // Check for valid email address
    document.querySelector('form').addEventListener('submit', (e) => {
        const email = document.getElementById('email').value;
        if (!email.includes('@')) {
            e.preventDefault(); // Stop form submission
            alert('Please enter a valid email address');
        }
    });    

    
    // Smooth Scrolling
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
