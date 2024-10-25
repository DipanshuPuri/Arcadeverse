// paragraphs.js
// Function to fetch a random paragraph from the Hipster Ipsum API
async function fetchRandomParagraph() {
    try {
        const response = await fetch('https://hipsum.co/api/?type=hipster-centric&paras=1'); // Fetch one hipster-centric paragraph
        if (!response.ok) {
            console.error('Network response was not ok:', response.statusText);
            return "Error fetching paragraph. Please try again."; // Fallback message
        }
        const data = await response.json();
        return data[0]; // Return the first paragraph from the response
    } catch (error) {
        console.error('Fetch error:', error);
        return "Error fetching paragraph. Please try again."; // Fallback message
    }
}

// Export the function so it can be used in other modules
export { fetchRandomParagraph };
