
const connection=require('../config/connect')

exports.getAssets = (req, res) => {
    connection.query('SELECT * FROM assets', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

  
exports.addAsset = (req, res) => {
    const { name, sku, assetTag, category, model, brand, serialNumber, quantity } = req.body;
    const thumbnail = req.file ? req.file.path : null;

    const newAsset = { name, sku, assetTag, category, model, brand, serialNumber, quantity, thumbnail };

    connection.query(
        'INSERT INTO assets (name, sku, assetTag, category, model, brand, serialNumber, quantity, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, sku, assetTag || null, category || null, model || null, brand || null, serialNumber || null, quantity, thumbnail],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_BAD_FIELD_ERROR') {
                    return res.status(500).json({ error: `Unknown column '${assetTag}' in 'INSERT INTO'` });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: result.insertId, ...newAsset });
        }
    );
};
