const connection = require('../config/connect');

exports.getRemarks=(req,res)=>{
    connection.query('SELECT * FROM remarks', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}

exports.addRemarks=(req,res)=>{
    const {asset_id,remark}=req.body
    const query='insert into remarks (asset_id,remark) values(?,?)'
    const data=[asset_id,remark]
    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create work order', details: err });
        }
        res.status(201).json({ message: 'Remarks created successfully', result });
    });
    
}