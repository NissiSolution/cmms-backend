const connection=require('../config/connect')


exports.getEmp=(req,res)=>{
    let query='select * from employee'
    connection.query(query,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result)
    })
}

exports.setEmp=(req,res)=>{
    const {name,department,skillset,email,phone}=req.body;
    
    const query ='INSERT INTO employee (name,department,skillset,email,phone) values(?,?,?,?,?)'
    const data=[name,department,skillset,email,phone];
    connection.query(query,data,(err,result)=>{
        if (err) {
            return res.status(500).json({ error: 'Error creating user', details: err });
        }
        res.status(201).json({ message: 'User created successfully', result });
    })
}