const connection = require('../config/connect');

exports.getRemarks=(req,res)=>{
    connection.query('SELECT * FROM remarks', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
}

exports.addRemarks=(req,res)=>{
    const {asset_id,asset_name,remark,stock}=req.body
    const query='insert into remarks (asset_id,remark,stock,asset_name) values(?,?,?,?)'
    const data=[asset_id,remark,parseInt(stock),asset_name]
    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create work order', details: err });
        }
        res.status(201).json({ message: 'Remarks created successfully', result });
    });
    
}