CREATE TABLE Vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    vin_number TEXT UNIQUE NOT NULL,
    registration_number TEXT UNIQUE NOT NULL,
    mileage INTEGER NOT NULL
);
