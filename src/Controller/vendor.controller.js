const connection = require('../config/connect');

// Fetch all vendors
exports.getVendors = (req, res) => {
    const query = 'SELECT * FROM vendors';
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching vendors', details: error });
        } else {
            res.status(200).json(result);
        }
    });
};

// Add a new vendor
exports.addVendor = (req, res) => {
    const { vendor_id,contactperson,name, email, phone,address } = req.body;

    const query = 'INSERT INTO vendors (vendor_id,name,contactperson,email, phone,address) VALUES (?, ?, ?,?,?,?)';
    const data = [vendor_id,name,contactperson, email, phone,address];

    connection.query(query, data, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error adding vendor', details: err });
        } else {
            res.status(201).json({ message: 'Vendor added successfully', result });
        }
    });
};

// Delete a vendor by ID
exports.deleteVendor = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM vendors WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting vendor', details: err });
        } else {
            res.status(200).json({ message: 'Vendor deleted successfully', result });
        }
    });
};
