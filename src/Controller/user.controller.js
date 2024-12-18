
const connection=require('../config/connect')


exports.getUser=(req,res)=>{
    let query='select * from users'

    connection.query(query,(error,result)=>{
        if(error) throw error;
        res.status(200).json(result)
    })
}

exports.setUser = (req, res) => {
    const { name, email, password, role } = req.body;

    // Parameterized query to prevent SQL injection
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const newData = [name, email, password, role];

    connection.query(query, newData, (err, result) => {
        if (err) {
            // Handle error (e.g., duplicate entry, validation issues, etc.)
            return res.status(500).json({ error: 'Error creating user', details: err });
        }
        res.status(201).json({ message: 'User created successfully', result });
    });
};
