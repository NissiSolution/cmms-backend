
const connection=require('../config/connect')


exports.getUser=(req,res)=>{
    let query='select * from testdb'

    connection.query(query,(error,result)=>{
        if(error) throw error;
        res.status(200).json(result)
    })
}

exports.setUser=(req,res)=>{

    
    const {name,age}=req.body;
    const newData=[
        name,age
    ]
let query='INSERT INTO testdb (name,age) values (?,?)'
    connection.query(query,newData,(err, result) => {
        if (err) throw err;
        res.status(201).json('user created' + result);
    });
}