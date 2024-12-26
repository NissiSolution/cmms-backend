const connection = require('../config/connect');

// Fetch all users
exports.getUser = (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, result) => {
        if (error) throw error;
        res.status(200).json(result);
    });
};

// Add a new user
exports.setUser = (req, res) => {
    const { name, email, password, role } = req.body;

    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const newData = [name, email, password, role];

    connection.query(query, newData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating user', details: err });
        }
        res.status(201).json({ message: 'User created successfully', result });
    });
};

// Update user password by ID
exports.updatePassword = (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    const query = 'UPDATE users SET password = ? WHERE id = ?';
    connection.query(query, [newPassword, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating password', details: err });
        }
        res.status(200).json({ message: 'Password updated successfully', result });
    });
};
