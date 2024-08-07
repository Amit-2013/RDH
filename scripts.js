async function searchVehicle() {
    const searchType = document.getElementById('search-type').value;
    const searchInput = document.getElementById('search-input').value;
    
    const response = await fetch('/search_vehicle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchType, searchInput })
    });

    const data = await response.json();
    document.getElementById('search-results').innerHTML = data.results;
}

// More JavaScript functions to handle other form submissions and interactions
