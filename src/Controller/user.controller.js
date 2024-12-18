
const connection=require('../config/connect')


exports.getUser=(req,res)=>{
    let query='select * from users'

    connection.query(query,(error,result)=>{
        if(error) throw error;
        res.status(200).json(result)
    })
}

exports.setUser=(req,res)=>{

    
    const {name,email,password,role}=req.body;
    const newData=[
        name,email,password,role
    ]
let query='INSERT INTO users (name,email,password,role) values (?,?)'
    connection.query(query,newData,(err, result) => {
        if (err) throw err;
        res.status(201).json('user created' + result);
    });
}