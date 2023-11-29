const express = require('express');
const { default: axios } = require('axios');
const db = require('../db');

const router = express.Router();

router.post('/cart', async (req, res) => {

    const product = req.body.product_id;
    const num = req.body.quantity;
    const sql = "SELECT name FROM products WHERE id = " + product;
    const result = await db.query(sql);

    const item = {
        "cart_id": req.session.nextCartId,
        "product_id": product,
        "name": result.rows[0].name,
        "quantity": num,
        "custom": false
    };

    req.session.nextCartId++;
    req.session.cartCount += parseInt(num);
    req.session.cart.push(item);
    // res.send(console.log(req.session.cart));
    res.status(201).json({ cartCount: req.session.cartCount, cart: req.session.cart });
});

router.post('/cart/custom', async (req, res) => {

    const quantity = 1;
    const toppings = req.body.customizations;
    const sql = "SELECT id,name FROM products WHERE name = '" + "Build Your Own!" + "'";
    const result = await db.query(sql);

    const item = {
        "cart_id": req.session.nextCartId,
        "product_id": result.rows[0].id,
        "name": result.rows[0].name,
        "quantity": quantity,
        "customizations": toppings,
        "custom": true
    };

    req.session.nextCartId++;
    req.session.cartCount += 1;
    req.session.cart.push(item);
    // res.send(console.log(req.session.cart));
    res.status(201).json({ cartCount: req.session.cartCount, cart: req.session.cart });
});


module.exports = router;