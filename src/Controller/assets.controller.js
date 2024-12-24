
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

    // Check if the SKU already exists in the database
    connection.query('SELECT * FROM assets WHERE sku = ?', [sku], (err, results) => {
        if (err) {
            console.error('Error checking SKU:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            // SKU exists, update the quantity
            connection.query(
                'UPDATE assets SET quantity = quantity + ? WHERE sku = ?',
                [quantity, sku],
                (err, result) => {
                    if (err) {
                        console.error('Error updating asset:', err);
                        return res.status(500).json({ error: err.message });
                    }

                    // Respond with a success message
                    res.status(200).json({ message: 'Asset quantity updated successfully.', sku });
                }
            );
        } else {
            // SKU does not exist, insert a new asset
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
    });
};

exports.editAsset = (req, res) => {
    const { id } = req.params; // Get the asset ID from the request parameters
    const { name, sku, assetTag, category, model, brand, serialNumber, quantity } = req.body;
    const thumbnail = req.file ? req.file.path : null;

    // Fetch the current asset data
    const selectQuery = 'SELECT * FROM assets WHERE id = ?';
    connection.query(selectQuery, [id], (selectErr, results) => {
        if (selectErr) {
            console.error('Error fetching asset:', selectErr);
            return res.status(500).json({ error: 'Error fetching asset.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Asset not found.' });
        }

        const currentAsset = results[0];

        // Prepare the updated data
        const updatedData = {
            name: name || currentAsset.name,
            sku: sku || currentAsset.sku,
            assetTag: assetTag || currentAsset.assetTag,
            category: category || currentAsset.category,
            model: model || currentAsset.model,
            brand: brand || currentAsset.brand,
            serialNumber: serialNumber || currentAsset.serialNumber,
            quantity: quantity !== undefined ? quantity : currentAsset.quantity,
            thumbnail: thumbnail || currentAsset.thumbnail,
        };

        // Update the asset in the database
        const updateQuery = `
            UPDATE assets 
            SET name = ?, sku = ?, assetTag = ?, category = ?, model = ?, brand = ?, serialNumber = ?, quantity = ?, thumbnail = ? 
            WHERE id = ?
        `;
        connection.query(updateQuery, [
            updatedData.name,
            updatedData.sku,
            updatedData.assetTag,
            updatedData.category,
            updatedData.model,
            updatedData.brand,
            updatedData.serialNumber,
            updatedData.quantity,
            updatedData.thumbnail,
            id,
        ], (updateErr, result) => {
            if (updateErr) {
                console.error('Error updating asset:', updateErr);
                return res.status(500).json({ error: 'Error updating asset.' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Asset not found.' });
            }

            res.status(200).json({
                message: 'Asset updated successfully.',
                updatedAsset: updatedData,
            });
        });
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

exports.getAssetById = (req, res) => {
    const { id } = req.params; // Get the asset ID from the request parameters

    const query = 'SELECT * FROM assets WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching asset:', err);
            return res.status(500).json({ error: 'Error fetching asset.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Asset not found.' });
        }

        res.status(200).json(results[0]); // Return the asset data
    });
};