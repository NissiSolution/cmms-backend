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
    const { name, priority, instructions, status,assigned } = req.body;

    const query = `INSERT INTO work_orders (name, priority, instructions, status, assigned) VALUES (?, ?, ?, ?, ?)`;
    const data = [name, priority, instructions, status,assigned ];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create work order', details: err });
        }
        res.status(201).json({ message: 'Work order created successfully', result });
    });
};

