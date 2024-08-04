document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const registrationNumber = document.getElementById('registrationNumber').value;
    const customerName = document.getElementById('customerName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const vinNumber = document.getElementById('vinNumber').value;

    fetch('http://localhost:3000/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            registrationNumber,
            customerName,
            mobileNumber,
            vinNumber
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Customer data submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit customer data.');
    });
});
