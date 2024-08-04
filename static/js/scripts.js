document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customer-form');
    const uploadForm = document.getElementById('upload-form');
    const generateBarcodeButton = document.getElementById('generate-barcode');
    const generateTokenSlipButton = document.getElementById('generate-token-slip');
    
    // Base URL for API requests
    const baseUrl = 'http://127.0.0.1:5000';

    // Handle customer form submission
    customerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const registrationNumber = document.getElementById('registration-number').value;
        const customerName = document.getElementById('customer-name').value;
        const mobileNumber = document.getElementById('mobile-number').value;
        const vinNumber = document.getElementById('vin-number').value;
        
        try {
            const response = await fetch(`${baseUrl}/api/customers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ registrationNumber, customerName, mobileNumber, vinNumber })
            });
            const data = await response.json();
            document.getElementById('customer-response').innerText = JSON.stringify(data);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle file upload
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        
        try {
            const response = await fetch(`${baseUrl}/api/upload/file`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            document.getElementById('upload-response').innerText = data.message;
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Generate barcode
    generateBarcodeButton.addEventListener('click', async () => {
        const token = document.getElementById('barcode-token').value;
        
        try {
            const response = await fetch(`${baseUrl}/api/barcode/${token}`);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const barcodeImage = document.getElementById('barcode-image');
            barcodeImage.src = url;
            barcodeImage.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Generate token slip
    generateTokenSlipButton.addEventListener('click', async () => {
        const token = document.getElementById('token').value;
        
        try {
            const response = await fetch(`${baseUrl}/api/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const tokenSlipLink = document.getElementById('token-slip-link');
            tokenSlipLink.href = url;
            tokenSlipLink.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
