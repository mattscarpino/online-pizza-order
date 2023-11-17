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

    const sql =
      'SELECT name, description, category, image FROM products ORDER BY category;';
    const results = await db.query(sql);

    res.render('menu', {
      title: 'Pizza Paradise',
      products: results.rows,
      user,
    });
  } else {
    res.redirect('users/login');
  }
});

module.exports = router;
