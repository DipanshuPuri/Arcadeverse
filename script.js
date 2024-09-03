document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Slideshow initialization
    const slideshowImage = document.getElementById('slideshow-image');
    console.log('Slideshow image element:', slideshowImage);

    if (slideshowImage) {
        const images = [
            "images/cardmemorymatch3.jpg",
            "images/tictactoe5.png",
            "images/typingmaster5.png",
            "images/rps1final.jpg"
        ];

        const indicators = document.querySelectorAll('.indicator');
        let currentIndex = 0;
        let isTransitioning = false;
        let isFirstImageChange = true; // Flag to track if the first image change has occurred
        const fadeDuration = 1000; // Duration of fade transitions in milliseconds

        function changeImage() {
            if (isTransitioning) return;

            isTransitioning = true;
            slideshowImage.classList.add('fade-out');

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                slideshowImage.src = images[currentIndex];
                slideshowImage.classList.remove('fade-out');
                slideshowImage.classList.add('fade-in');

                setTimeout(() => {
                    slideshowImage.classList.remove('fade-in');
                    isTransitioning = false;

                    // Update indicators only after the first image change
                    if (!isFirstImageChange) {
                        updateIndicators();
                    }
                }, fadeDuration);
            }, fadeDuration);

            // Update indicators immediately after initialization
            if (isFirstImageChange) {
                isFirstImageChange = false;
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

                slideshowImage.classList.add('fade-out');

                setTimeout(() => {
                    slideshowImage.src = images[currentIndex];
                    slideshowImage.classList.remove('fade-out');
                    slideshowImage.classList.add('fade-in');

                    setTimeout(() => {
                        slideshowImage.classList.remove('fade-in');
                        isTransitioning = false;
                    }, fadeDuration);
                }, fadeDuration);

                updateIndicators();
            }
        }

        // Initialize the first image without updating indicators
        function initializeSlideshow() {
            slideshowImage.src = images[currentIndex];
        }

        initializeSlideshow();

        indicators.forEach(indicator => {
            console.log('Adding click listener');
            indicator.addEventListener('click', handleIndicatorClick);
        });

        setInterval(changeImage, 3000); // Change image every 3 seconds
    } else {
        console.error('Slideshow image element not found');
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
});
