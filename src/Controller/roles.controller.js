const connection = require('../config/connect');

// Fetch all roles
exports.getRoles = (req, res) => {
    const query = 'SELECT * FROM roles';
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching roles', details: error });
        } else {
            res.status(200).json(result);
        }
    });
};

// Add a new role
exports.addRole = (req, res) => {
    const { name, permissions } = req.body;
    const query = 'INSERT INTO roles (name, permissions) VALUES (?, ?)';
    const data = [name, JSON.stringify(permissions)]; // Store permissions as JSON in DB

    connection.query(query, data, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error adding role', details: err });
        } else {
            res.status(201).json({ message: 'Role added successfully', result });
        }
    });
};

// Delete a role by ID
exports.deleteRole = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM roles WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting role', details: err });
        } else {
            res.status(200).json({ message: 'Role deleted successfully', result });
        }
    });
};
