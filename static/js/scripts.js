document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customerForm');
    const searchForm = document.getElementById('searchForm');
    const inspectionForm = document.getElementById('inspectionForm');
    const partsRequestForm = document.getElementById('partsRequestForm');
    const partRequirementForm = document.getElementById('partRequirementForm');
    const partsInventoryForm = document.getElementById('partsInventoryForm');
    const barcodeButton = document.getElementById('generateBarcode');
    const tokenSlipButton = document.getElementById('generateTokenSlip');
    const previewContainer = document.getElementById('previewContainer');
    
    // Validate form fields
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
        for (const input of inputs) {
            if (input.value.trim() === '') {
                alert('Please fill out all required fields.');
                return false;
            }
        }
        return true;
    }

    // Handle customer search
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const registrationNumber = document.getElementById('search_registration_number').value;
        try {
            const response = await fetch('http://127.0.0.1:5000/search_customer', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({registration_number: registrationNumber})
            });
            const data = await response.json();
            if (data.message) {
                document.getElementById('searchResponse').textContent = data.message;
            } else {
                document.getElementById('customer_id').value = data.id;
                document.getElementById('registration_number').value = data.registration_number;
                document.getElementById('customer_name').value = data.customer_name;
                document.getElementById('mobile_number').value = data.mobile_number;
                document.getElementById('vin_number').value = data.vin_number;
                document.getElementById('searchResponse').textContent = 'Customer found.';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle customer form submission
    customerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm(customerForm)) {
            return;
        }
        const formData = new FormData(customerForm);
        try {
            const response = await fetch('http://127.0.0.1:5000/customer', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            document.getElementById('customerResponse').textContent = data.message;
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle vehicle inspection form submission
    inspectionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm(inspectionForm)) {
            return;
        }
        const formData = new FormData(inspectionForm);
        try {
            const response = await fetch('http://127.0.0.1:5000/inspection', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            document.getElementById('inspectionResponse').textContent = data.message;
            if (data.token_number) {
                document.getElementById('token_number').value = data.token_number;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle parts request form submission
    partsRequestForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm(partsRequestForm)) {
            return;
        }
        const formData = new FormData(partsRequestForm);
        try {
            const response = await fetch('http://127.0.0.1:5000/parts_request', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle part requirement form submission
    partRequirementForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm(partRequirementForm)) {
            return;
        }
        const formData = new FormData(partRequirementForm);
        try {
            const response = await fetch('http://127.0.0.1:5000/part_requirement', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle parts inventory form submission
    partsInventoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(partsInventoryForm);
        try {
            const response = await fetch('http://127.0.0.1:5000/parts_inventory', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle barcode generation
    barcodeButton.addEventListener('click', async () => {
        const tokenNumber = document.getElementById('barcode_token').value;
        try {
            const response = await fetch(`http://127.0.0.1:5000/generate_barcode?token=${tokenNumber}`);
            const data = await response.json();
            if (data.barcode_url) {
                document.getElementById('barcode_image').src = data.barcode_url;
                document.getElementById('barcode_image').style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle token slip generation
    tokenSlipButton.addEventListener('click', async () => {
        const tokenNumber = document.getElementById('token_number').value;
        try {
            const response = await fetch(`http://127.0.0.1:5000/generate_token_slip?token=${tokenNumber}`);
            const data = await response.json();
            if (data.token_slip_url) {
                document.getElementById('token_slip_link').href = data.token_slip_url;
                document.getElementById('token_slip_link').style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Function to preview image
    function previewImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement('img');
                preview.src = e.target.result;
                preview.width = 100;
                previewContainer.appendChild(preview);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', () => previewImage(input));
    });
});
