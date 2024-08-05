const BASE_URL = 'http://127.0.0.1:5000';

// Function to search customer information
function searchCustomer() {
    const identifier = document.getElementById('search-identifier').value;
    fetch(`${BASE_URL}/search_customer?identifier=${identifier}`)
        .then(response => response.json())
        .then(data => {
            const customerInfo = document.getElementById('customer-info');
            customerInfo.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
}

// Function to search or create a vehicle
function searchOrCreateVehicle() {
    const vin = document.getElementById('vehicle-vin').value;
    const reg = document.getElementById('vehicle-reg').value;
    fetch(`${BASE_URL}/search_vehicle?vin=${vin}&registration_number=${reg}`)
        .then(response => response.json())
        .then(data => {
            const vehicleInfo = document.getElementById('vehicle-management-info');
            vehicleInfo.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
}

// Function to submit data entry form
function submitDataEntry() {
    const formData = new FormData(document.getElementById('data-entry-form'));
    fetch(`${BASE_URL}/submit_data_entry`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById('data-entry-result');
        result.innerHTML = `Token Number: ${data.token_number}<br>Barcode: <img src="data:image/png;base64,${data.barcode}" alt="Barcode"/>`;
    })
    .catch(error => console.error('Error:', error));
}

// Function to submit vehicle inspection
function submitInspection() {
    const formData = new FormData(document.getElementById('vehicle-inspection-form'));
    fetch(`${BASE_URL}/submit_inspection`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById('inspection-result');
        result.innerHTML = 'Inspection submitted successfully!';
    })
    .catch(error => console.error('Error:', error));
}

// Function to add a part to inventory
function addPart() {
    const formData = new FormData(document.getElementById('parts-inventory-form'));
    fetch(`${BASE_URL}/add_part`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const partsList = document.getElementById('parts-inventory-list');
        partsList.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
}

// Function to submit parts request
function submitPartsRequest() {
    const formData = new FormData(document.getElementById('parts-request-form'));
    fetch(`${BASE_URL}/submit_parts_request`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById('parts-request-result');
        result.innerHTML = 'Parts request submitted successfully!';
    })
    .catch(error => console.error('Error:', error));
}

// Function to get parts history
function getPartsHistory() {
    const reg = document.getElementById('history-vehicle-reg').value;
    fetch(`${BASE_URL}/get_parts_history?registration_number=${reg}`)
        .then(response => response.json())
        .then(data => {
            const historyResult = document.getElementById('parts-history-result');
            historyResult.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
}

// Function to get issued parts history
function getIssuedPartsHistory() {
    const reg = document.getElementById('issued-vehicle-reg').value;
    const date = document.getElementById('issued-date').value;
    fetch(`${BASE_URL}/get_issued_parts_history?registration_number=${reg}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            const issuedHistoryResult = document.getElementById('parts-issued-history-result');
            issuedHistoryResult.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
}

// Function to submit billing information
function submitBilling() {
    const formData = new FormData(document.getElementById('billing-form'));
    fetch(`${BASE_URL}/submit_billing`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById('billing-result');
        result.innerHTML = 'Billing information submitted successfully!';
    })
    .catch(error => console.error('Error:', error));
}
