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
            "images/rps_animation.mp4"
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

    // Handle 'Reach Out to Us' button click
    const reachOutBtn = document.querySelector('.contact-button');
    const formContainer = document.getElementById('form-container'); // Ensure this matches the container in your HTML

    if (reachOutBtn) {
        reachOutBtn.addEventListener('click', () => {
            // Scroll down smoothly to where the form will appear
            window.scrollBy({
                top: 500, // Adjust how much you want to scroll
                behavior: 'smooth'
            });

            // Check if the form already exists
            if (!document.querySelector('.form-section')) {
                // Show the form container first
                formContainer.style.display = 'block';

                // Create the new section with form
                const formSection = document.createElement('section');
                formSection.classList.add('form-section');
                
                // Set initial opacity to 0 for smooth appearance
                formSection.style.opacity = '0';
                formSection.style.transition = 'opacity 0.5s ease-in-out';

                // Adding the form structure
                formSection.innerHTML = `
                    <span>Submit a Ticket</span>
                    <form>
                        <label for="game-select">Select Game</label>
                        <select id="game-select" name="game">
                            <option value="" disabled selected>Select an option</option>
                            <option value="game1">Card Memory Match</option>
                            <option value="game2">Tic Tac Toe</option>
                            <option value="game3">Rock Paper Scissors</option>
                            <option value="game3">Wordle</option>
                            <option value="game3">Typing Master</option>
                        </select>
                        
                        <label for="category">Please selecr the issue that you are having</label>
                        <select id="category" name="category">
                            <option value="" disabled selected>Select an option</option>
                            <option value="game1">Payment and billing</option>
                            <option value="game2">Report inappropriate behaviour</option>
                            <option value="game3">Related to my account</option>
                            <option value="game3">Technical problems and bugs</option>
                            <option value="game3">Questions about the game</option>
                            <option value="game3">Other issues</option>
                        </select>
                        <small class="note">Please select an issue you are having. Selecting correct topic allows us to help you faster.</small>
                        
                        <label for="email">Your email address</label>
                        <input type="email" id="email" name="email" placeholder="Enter text here" required>
                        
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" placeholder="Enter text here" maxlength="100" required>
                        <small class="note">Please do not add more than 100 characters here.&nbsp;If you wish to share more information with us, please add it to the "Description" box below.</small>
                        
                        <label for="description">Description</label>
                        <textarea id="description" name="description" placeholder="Enter text here" rows="10" required></textarea>
                        <small class="note">Please enter the details of your request and make sure you include the email address associated with your game account.&nbsp;A member of our support staff will respond as soon as possible.</small>
                        
                        <button type="submit" class="form-submit-button">SUBMIT</button>
                    </form>
                `;

                // Append the form section to the form container
                formContainer.appendChild(formSection);

                // Smooth appearance of the new section after appending
                setTimeout(() => {
                    formSection.style.opacity = '1'; // Reveal the form section
                }, 10); // Delay for smooth transition
            }
        });
    } else {
        console.error('Reach Out button not found');
    }

});
