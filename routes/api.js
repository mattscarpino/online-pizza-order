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



    const item = {
        "cart_id": req.session.nextCartId,
        "product_id": product,
        "name": result.rows[0].name,
        "quantity": num,
    };
    req.session.nextCartId++;
    req.session.cartCount++;
    req.session.cart.push(item);
    // res.send(console.log(req.session.cart));
    res.send({ cartCount: req.session.cartCount, cart: req.session.cart });
});


module.exports = router;