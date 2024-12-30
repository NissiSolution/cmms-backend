const connection = require('../config/connect');

// Get all locations
exports.getLocations = (req, res) => {
    connection.query('SELECT * FROM locations', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add a new location
exports.addLocation = (req, res) => {
    const { name, address } = req.body;
    const query = 'INSERT INTO locations (name, address) VALUES (?, ?)';
    const data = [name, address];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add location', details: err });
        }
        res.status(201).json({ message: 'Location added successfully', id: result.insertId });
    });
};

// Update an existing location
exports.updateLocation = (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;
    const query = 'UPDATE locations SET name = ?, address = ? WHERE id = ?';
    const data = [name, address, id];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update location', details: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json({ message: 'Location updated successfully' });
    });
};

// Delete a location
exports.deleteLocation = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM locations WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete location', details: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json({ message: 'Location deleted successfully' });
    });
};
