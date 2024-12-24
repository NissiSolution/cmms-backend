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


exports.deleteRemark = (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    const query = 'DELETE FROM remarks WHERE id = ?'; // SQL query to delete the remark
    connection.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete remark', details: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Remark not found' });
        }
        res.status(200).json({ message: 'Remark deleted successfully' });
    });
};