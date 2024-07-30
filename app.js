document.addEventListener('DOMContentLoaded', () => {
    const backendUrl = 'http://127.0.0.1:5000';
    
    const addPartButton = document.getElementById('addPartButton');
    const importFile = document.getElementById('importFile');
    const searchButton = document.getElementById('searchButton');
    const search = document.getElementById('search');
    const activityList = document.getElementById('activity-list');
    const inventoryList = document.getElementById('inventory-list');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    // Handle add part button click
    if (addPartButton) {
        addPartButton.addEventListener('click', () => {
            const partName = prompt('Enter part name:');
            const partQuantity = prompt('Enter part quantity:');
            if (partName && partQuantity) {
                fetch(`${backendUrl}/inventory`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: partName, quantity: partQuantity })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Part added successfully.');
                        loadInventory();
                    } else {
                        alert('Error adding part.');
                    }
                });
            }
        });
    }

    // Handle import file
    if (importFile) {
        importFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                fetch(`${backendUrl}/import`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('File imported successfully.');
                        loadInventory();
                    } else {
                        alert('Error importing file.');
                    }
                });
            }
        });
    }

    // Handle search button click
    if (searchButton) {
        searchButton.addEventListener('click', async () => {
            const query = search.value;
            if (query) {
                const response = await fetch(`${backendUrl}/inventory?search=${query}`);
                const results = await response.json();
                displayInventory(results);
            } else {
                alert('Please enter a search query.');
            }
        });
    }

    // Populate dashboard metrics and recent activities
    if (activityList) {
        fetch(`${backendUrl}/dashboard`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('daily-sales').textContent = data.daily_sales;
                document.getElementById('inventory-levels').textContent = data.inventory_levels;

                data.recent_activities.forEach(activity => {
                    const li = document.createElement('li');
                    li.textContent = activity;
                    activityList.appendChild(li);
                });
            });
    }

    // Load inventory
    function loadInventory() {
        fetch(`${backendUrl}/inventory`)
            .then(response => response.json())
            .then(data => {
                displayInventory(data);
            });
    }

    function displayInventory(items) {
        inventoryList.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('inventory-item');
            div.innerHTML = `
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity}</p>
            `;
            inventoryList.appendChild(div);
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the form from submitting the default way

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${backendUrl}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();

                if (response.ok) {
                    loginMessage.textContent = 'Login successful!';
                    loginMessage.style.color = 'green';
                    // Optionally redirect or perform other actions here
                    // window.location.href = 'somepage.html';
                } else {
                    loginMessage.textContent = result.message || 'Login failed!';
                    loginMessage.style.color = 'red';
                }
            } catch (error) {
                loginMessage.textContent = 'An error occurred. Please try again.';
                loginMessage.style.color = 'red';
            }
        });
    }

    // Initial load of inventory
    if (inventoryList) {
        loadInventory();
    }
});
