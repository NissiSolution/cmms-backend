
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

    if (sku) {
        // Update the quantity if the SKU exists
        connection.query(
            'UPDATE assets SET quantity = quantity + ? WHERE sku = ?',
            [quantity, sku], // Pass parameters as an array
            (err, result) => {
                if (err) {
                    console.error('Error updating asset:', err);
                    return res.status(500).json({ error: err.message });
                }

                // Check if any rows were affected
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Asset with the given SKU not found.' });
                }

                // Respond with a success message
                res.status(200).json({ message: 'Asset quantity updated successfully.', sku });
            }
        );
    } else {
        // Insert a new asset if SKU is not provided
        connection.query(
            'INSERT INTO assets (name, sku, assetTag, category, model, brand, serialNumber, quantity, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, sku, assetTag || null, category || null, model || null, brand || null, serialNumber || null, quantity, thumbnail],
            (err, result) => {
                if (err) {
                    console.error('Error inserting asset:', err);
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id: result.insertId, ...newAsset });
            }
        );
    }
};
;

exports.editAsset = (req, res) => {
    const { id } = req.params; // Get the asset ID from the request parameters
    const { name, sku, assetTag, category, model, brand, serialNumber, quantity } = req.body;
    const thumbnail = req.file ? req.file.path : null;

    const sql = 'UPDATE assets SET name = ?, sku = ?, assetTag = ?, category = ?, model = ?, brand = ?, serialNumber = ?, quantity = ?, thumbnail = ? WHERE id = ?';
    connection.query(sql, [name, sku, assetTag, category, model, brand, serialNumber, quantity, thumbnail, id], (err, result) => {
        if (err) {
            console.error('Error updating asset:', err);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asset not found.' });
        }

        res.status(200).json({ message: 'Asset updated successfully.' });
    });
};

// Delete Asset Function
exports.deleteAsset = (req, res) => {
    const { id } = req.params; // Get the asset ID from the request parameters

    const sql = 'DELETE FROM assets WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting asset:', err);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Asset not found.' });
        }

        res.status(200).json({ message: 'Asset deleted successfully.' });
    });
};
