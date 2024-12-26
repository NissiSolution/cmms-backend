const connection = require('../config/connect');

// Fetch all employees
exports.getEmp = (req, res) => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return res.status(500).json({ error: 'Failed to fetch employees', details: err });
        }
        res.status(200).json(result);
    });
};

// Add a new employee
exports.setEmp = (req, res) => {
    const { name,emp_id, department,dateofjoin, skillset, email,password, phone } = req.body;

    const query = 'INSERT INTO employee (emp_id,name, department, dateofjoin,skillset, email, phone,password) VALUES (?,?, ?,?, ?, ?, ?,?)';
    const data = [emp_id ,name,department,dateofjoin, skillset, email, phone,password];

    connection.query(query, data, (err, result) => {
        if (err) {
            console.error('Error creating employee:', err);
            return res.status(500).json({ error: 'Error creating employee', details: err });
        }
        res.status(201).json({ message: 'Employee created successfully', result });
    });
};

// Mark attendance for an employee
exports.markAttendance = (req, res) => {
    const { employee_Id, status } = req.body;

    if (!employee_Id || !status) {
        return res.status(400).json({ error: 'Employee ID and status are required' });
    }

    const query = 'INSERT INTO attendance (employee_Id, status, date) VALUES (?, ?, NOW())';
    const data = [employee_Id, status];

    connection.query(query, data, (err, result) => {
        if (err) {
            console.error('Error marking attendance:', err);
            return res.status(500).json({ error: 'Failed to mark attendance', details: err });
        }
        res.status(201).json({ message: 'Attendance marked successfully', result });
    });
};

exports.getatd = (req, res) => {
    const query = 'SELECT * FROM attendance';
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return res.status(500).json({ error: 'Failed to fetch employees', details: err });
        }
        res.status(200).json(result);
    });
};