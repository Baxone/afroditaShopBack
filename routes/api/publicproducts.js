const router = require('express').Router();

const { getAll, getById, getByCategory, getCount } = require('../../models/product.model');

// GET http://localhost:3000/api/products?page=2&limit=5
router.get('/', (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    // 1 - Recuperar los productos de la base de datos
    // 2 - Enviar en formato JSON los productos al cliente
    getAll(parseInt(page), parseInt(limit))
        .then(async result => {
            const count = await getCount();
            const totalPage = Math.ceil(count.totalProducts / limit);
            console.log(totalPage); 
            res.json({
                info: {
                    total: count.totalProducts,
                    next: (page === totalPage) ? totalPage : page + 1,
                    prev: (page === 1) ? 1 : page - 1,
                },
                data: result
            })
        })
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