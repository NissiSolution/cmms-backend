const connection = require('../config/connect');

// Fetch all work orders
exports.getWorkOrders = (req, res) => {
    const query = 'SELECT * FROM work_orders';
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch work orders', details: err });
        }
        res.status(200).json(result);
    });
};

exports.addWorkOrder = (req, res) => {
    const { name, priority, instructions, status, image } = req.body;

    const query = `INSERT INTO work_orders (name, priority, instructions, status, assigned,image) VALUES (?, ?, ?, ?, ?)`;
    const data = [name, priority, instructions, status, Buffer.from(image, 'base64')];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create work order', details: err });
        }
        res.status(201).json({ message: 'Work order created successfully', result });
    });
};

