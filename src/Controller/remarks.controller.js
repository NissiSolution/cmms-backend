const connection = require('../config/connect');

exports.getRemarks=(req,res)=>{
    connection.query('SELECT * FROM remarks', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}

exports.addRemarks=(req,res)=>{
    const {asset_id,remark,stock}=req.body
    const query='insert into remarks (asset_id,remark,stock) values(?,?,?)'
    const data=[asset_id,remark,parseInt(stock)]
    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create work order', details: err });
        }
        res.status(201).json({ message: 'Remarks created successfully', result });
    });
    
}