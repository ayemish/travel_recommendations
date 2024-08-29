// script.js

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('input-btn');
    const resultsContainer = document.getElementById('results-container');

    // Fetch data from the JSON file
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Attach event listener to the search button
            searchButton.addEventListener('click', () => {
                const query = searchInput.value.toLowerCase(); // Normalize input to lowercase
                resultsContainer.innerHTML = ''; // Clear previous results

                if (query === "") {
                    alert("Please enter a keyword to search.");
                    return;
                }

                // Determine the category based on the search query
                let category = null;
                if (["beach", "beaches"].includes(query)) {
                    category = "beach";
                } else if (["temple", "temples"].includes(query)) {
                    category = "temple";
                } else if (["country", "countries"].includes(query) || ["japan", "france", "usa", "india"].includes(query)) {
                    category = "country";
                }

                // Filter recommendations based on the category
                const filteredRecommendations = data.filter(item => item.category === category);

                // Display the filtered recommendations
                if (filteredRecommendations.length > 0) {
                    displaySearchResults(filteredRecommendations);
                } else {
                    displayNoResultsMessage(query);
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display search results
    function displaySearchResults(recommendations) {
        recommendations.forEach(recommendation => {
            // Create a card for each recommendation
            const card = document.createElement('div');
            card.classList.add('recommendation-card');

            // Image
            const img = document.createElement('img');
            img.src = recommendation.imageUrl; // Ensure images exist in your project folder
            img.alt = recommendation.name;
            card.appendChild(img);

            // Name of the place
            const name = document.createElement('h3');
            name.textContent = recommendation.name;
            card.appendChild(name);

            // Description
            const description = document.createElement('p');
            description.textContent = recommendation.description;
            card.appendChild(description);

            // Append the card to the container
            resultsContainer.appendChild(card);
        });
    }

    // Function to display no results found message
    function displayNoResultsMessage(query) {
        const message = document.createElement('p');
        message.textContent = `No results found for "${query}". Please try a different keyword.`;
        resultsContainer.appendChild(message);
    }
});
const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);
