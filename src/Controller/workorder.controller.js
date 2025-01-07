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
    const { name, priority, instructions, status, assigned, department, start_date, deadline } = req.body;

    const query = `INSERT INTO work_orders (name, priority, instructions, status, assigned, department, start_date, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const data = [name, priority, instructions, status, assigned, department, start_date, deadline];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create work order', details: err });
        }
        res.status(201).json({ message: 'Work order created successfully', result });
    });
};

exports.updateWorkOrder = (req, res) => {
    const { id, name, priority, instructions, status, assigned, department, start_date, deadline } = req.body;

    const query = `UPDATE work_orders SET name = ?, priority = ?, instructions = ?, status = ?, assigned = ?, department = ?, start_date = ?, deadline = ? WHERE id = ?`;
    const data = [name, priority, instructions, status, assigned, department, start_date, deadline, id];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update work order', details: err });
        }
        res.status(200).json({ message: 'Work order updated successfully', result });
    });
};
