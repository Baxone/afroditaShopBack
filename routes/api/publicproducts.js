const router = require('express').Router();

const { getAll, getById, getByCategory } = require('../../models/product.model');

// GET http://localhost:3000/api/products?page=2&limit=5
router.get('/', (req, res) => {

    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    // 1 - Recuperar los productos de la base de datos
    // 2 - Enviar en formato JSON los productos al cliente
    getAll(parseInt(page), parseInt(limit))
        .then(result => res.json(result))
        .catch(err => res.json({ error: err.message }));
});


router.get('/cat/:category', (req, res) => {
    getByCategory(req.params.category)
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json({ error: error.message }));
});


router.get('/:productId', async (req, res) => {
    try {
        const result = await getById(req.params.productId);
        if (result) {
            res.json(result);
        } else {
            res.json({ error: 'El producto no existe en la base de datos' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});








module.exports = router;