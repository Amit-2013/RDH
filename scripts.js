document.addEventListener('DOMContentLoaded', () => {
    // Function to show the selected tab content
    function showTab(tabId) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabId).style.display = 'block';
    }

    // Initially show the Customer Vehicles Data Storage tab
    showTab('customer-vehicles');

    // Function to add a customer to the database
    async function addCustomer() {
        const formData = new FormData(document.getElementById('customer-form'));
        const response = await fetch('/add-customer', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
    }

    // Function to search for a customer
    async function searchCustomer() {
        const searchIdentifier = document.getElementById('search_identifier').value;
        const response = await fetch(`/search-customer?identifier=${searchIdentifier}`);
        const customer = await response.json();
        
        if (customer) {
            document.getElementById('search-results').innerHTML = `
                <p><strong>Customer Name:</strong> ${customer.customer_name}</p>
                <p><strong>Mobile Number:</strong> ${customer.mobile_number}</p>
                <p><strong>VIN Number:</strong> ${customer.vin_number}</p>
                <p><strong>Registration Number:</strong> ${customer.registration_number}</p>
                <p><strong>Mileage:</strong> ${customer.mileage}</p>
            `;
        } else {
            document.getElementById('search-results').innerHTML = '<p>No customer found.</p>';
        }
    }

    // Function to submit the data entry form
    async function submitDataEntry() {
        const formData = new FormData(document.getElementById('data-entry-form'));
        const response = await fetch('/submit-data-entry', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            document.getElementById('token-info').innerHTML = `
                <p><strong>Token Number:</strong> ${result.token}</p>
                <p><strong>Bar Code:</strong> <img src="${result.barcode}" alt="Barcode"></p>
                <button onclick="window.print()">Print</button>
            `;
        } else {
            alert(result.message);
        }
    }

    // Function to submit the vehicle inspection form
    async function submitInspection() {
        const formData = new FormData(document.getElementById('inspection-form'));
        const response = await fetch('/submit-inspection', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
    }

    // Function to submit parts request
    async function submitPartsRequest() {
        const formData = new FormData(document.getElementById('parts-request-form'));
        const response = await fetch('/submit-parts-request', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
    }

    // Function to load parts inventory
    async function loadPartsInventory() {
        const response = await fetch('/get-parts-inventory');
        const parts = await response.json();

        const partsTable = document.getElementById('parts-table');
        partsTable.innerHTML = '<tr><th>Part No</th><th>Part Name</th><th>Quantity</th></tr>';
        
        parts.forEach(part => {
            const row = partsTable.insertRow();
            row.insertCell(0).innerText = part.part_no;
            row.insertCell(1).innerText = part.part_name;
            row.insertCell(2).innerText = part.quantity;
        });
    }

    // Load parts inventory when the Parts Inventory tab is shown
    document.querySelector('a[href="#parts-inventory"]').addEventListener('click', loadPartsInventory);

    // Function to handle admin login
    async function handleLogin() {
        const formData = new FormData(document.getElementById('login-form'));
        const response = await fetch('/login', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        
        if (result.success) {
            alert('Login successful');
            window.location.href = '/dashboard';
        } else {
            alert('Login failed');
        }
    }

    // Function to handle admin actions (reset password, disable/delete user)
    async function handleAdminAction(action, userId) {
        const response = await fetch(`/admin/${action}/${userId}`, {
            method: 'POST'
        });
        const result = await response.json();
        alert(result.message);
    }

    // Expose functions to the global scope
    window.showTab = showTab;
    window.addCustomer = addCustomer;
    window.searchCustomer = searchCustomer;
    window.submitDataEntry = submitDataEntry;
    window.submitInspection = submitInspection;
    window.submitPartsRequest = submitPartsRequest;
    window.handleLogin = handleLogin;
    window.handleAdminAction = handleAdminAction;
});
