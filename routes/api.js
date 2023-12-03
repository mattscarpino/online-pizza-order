const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/cart', async (req, res) => {
  const product = req.body.product_id;
  const num = req.body.quantity;
  const sql = 'SELECT name FROM products WHERE id = ' + product;
  const result = await db.query(sql);

  const item = {
    cart_id: req.session.nextCartId,
    product_id: product,
    name: result.rows[0].name,
    quantity: num,
    custom: false,
  };

  req.session.nextCartId++;
  req.session.cartCount += parseInt(num, 10);
  req.session.cart.push(item);
  // res.send(console.log(req.session.cart));
  res
    .status(201)
    .json({ cartCount: req.session.cartCount, cart: req.session.cart });
});

router.post('/cart/custom', async (req, res) => {
  const num = 1;
  const toppings = req.body.customizations;
  const name = 'Build Your Own!';
  const sql = "SELECT id,name FROM products WHERE name = '" + name + "'";
  const result = await db.query(sql);

  const item = {
    cart_id: req.session.nextCartId,
    product_id: result.rows[0].id,
    name: result.rows[0].name,
    quantity: num,
    customizations: toppings,
    custom: true,
  };

  req.session.nextCartId++;
  req.session.cartCount += 1;
  req.session.cart.push(item);
  // res.send(console.log(req.session.cart));
  res
    .status(201)
    .json({ cartCount: req.session.cartCount, cart: req.session.cart });
});

router.post('/update', async (req, res) => {
  const product = req.body.cart_id;
  const num = parseInt(req.body.quantity, 10);

  for (let i = 0; i < req.session.cart.length; i++) {
    if (product === req.session.cart[i].cart_id) {
      if (num > req.session.cart.quantity) {
        req.session.cartCount += num - req.session.cart[i].quantity;
      } else {
        req.session.cartCount -= req.session.cart[i].quantity - num;
      }
      req.session.cart[i].quantity = num;
    }
  }
  // res.send(console.log(req.session.cart));
  res.status(200).json({
    cartCount: req.session.cartCount,
    cart: req.session.cart,
    quantity: num,
  });
});

router.post('/cart/:id', async (req, res) => {
  let num = 0;
  const id = parseInt(req.params.id, 10);

  for (let i = 0; i < req.session.cart.length; i++) {
    if (id === req.session.cart[i].cart_id) {
      req.session.cartCount -= req.session.cart[i].quantity;
      num = i;
    }
  }

  const arrayList = req.session.cart;
  arrayList.splice(num, 1);

  // res.send(console.log(req.session.cart));
  res.status(200).json({
    cartCount: req.session.cartCount,
  });
});

module.exports = router;
