// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    showTab('customer-vehicles');
});

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

// Add customer form handling
function addCustomer() {
    const formData = new FormData(document.getElementById('customer-form'));
    fetch('/add_customer', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Customer added successfully');
        document.getElementById('customer-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Search customer
function searchCustomer() {
    const identifier = document.getElementById('search_identifier').value;
    fetch(`/search_customer?identifier=${identifier}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('search-results').innerText = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Data entry form handling
function submitDataEntry() {
    const formData = new FormData(document.getElementById('data-entry-form'));
    fetch('/submit_data_entry', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('token-info').innerText = `Token Number: ${data.token}`;
        document.getElementById('data-entry-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Vehicle inspection form handling
function submitInspection() {
    const formData = new FormData(document.getElementById('inspection-form'));
    fetch('/submit_inspection', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Inspection submitted successfully');
        document.getElementById('inspection-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Add part to inventory
function addPart() {
    const formData = new FormData(document.getElementById('parts-form'));
    fetch('/add_part', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Part added successfully');
        document.getElementById('parts-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Submit parts request
function submitPartsRequest() {
    const formData = new FormData(document.getElementById('parts-request-form'));
    fetch('/submit_parts_request', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Parts request submitted successfully');
        document.getElementById('parts-request-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Search parts history
function searchPartsHistory() {
    const identifier = document.getElementById('history_identifier').value;
    fetch(`/search_parts_history?identifier=${identifier}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('parts-history-results').innerText = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Search parts issued history
function searchIssuedHistory() {
    const identifier = document.getElementById('issued_identifier').value;
    fetch(`/search_issued_history?identifier=${identifier}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('issued-history-results').innerText = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Submit billing details
function submitBilling() {
    const formData = new FormData(document.getElementById('billing-form'));
    fetch('/submit_billing', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Billing details submitted successfully');
        document.getElementById('billing-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
