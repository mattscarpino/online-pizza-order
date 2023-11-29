const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  let user = false;
  if (req.session.user) {
    user = true;
  }
  res.render('index', { title: 'Express', user });
});

// menu route completed

router.get('/menu', async (req, res) => {
  if (req.session.user) {
    const user = true;
    let name = 'Build Your Own!';
    const sql =
      "SELECT id, name, description, category, image FROM products WHERE NOT name = '" + name + "' ORDER BY category;";
    const results = await db.query(sql);
    const count = req.session.cartCount;

    const tops = 'SELECT id, name, category FROM customizations ORDER BY id;';
    const custom = await db.query(tops);

    res.render('menu', {
      title: 'Pizza Paradise',
      products: results.rows,
      user,
      itemCount: count,
      toppings: custom.rows
    });
  } else {
    res.redirect('users/login');
  }
});

router.get('/cartSummary', async (req, res) => {
  if (req.session.user) {
    const user = true;

    const count = req.session.cartCount;
    const allItems = req.session.cart;

    res.render('cartSummary', {
      title: 'Pizza Paradise',
      cart: allItems,
      itemCount: count,
      user,
    });
  } else {
    res.redirect('users/login');
  }
});

module.exports = router;
