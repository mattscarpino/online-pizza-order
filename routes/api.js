const express = require('express');
const { default: axios } = require('axios');
const db = require('../db');

const router = express.Router();

router.post('/cart', async (req, res) => {

    // const getAPI = await axios.get('api/cart/get');
    const product = req.body.product_id;
    const num = req.body.quantity;
    const sql = "SELECT name FROM products WHERE id = " + product;
    const result = await db.query(sql);

    const customizations = req.body.customizations || [];
    item.customizations = customizations.map(id => ({ id: id }));

    const item = {
        "cart_id": req.session.nextCartId,
        "product_id": product,
        "name": result.rows[0].name,
        "quantity": num,
    };
    req.session.nextCartId++;
    req.session.cartCount += parseInt(num);
    req.session.cart.push(item);
    // res.send(console.log(req.session.cart));
    res.send({ cartCount: req.session.cartCount, cart: req.session.cart });
});

// Endpoint to get customization options
router.get('/customizations', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM customizations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Server error');
    }
});


module.exports = router;