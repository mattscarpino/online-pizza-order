const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

// registration routes completed

// load register page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Express' });
});

// user registration
router.post('/register', async (req, res) => {
  const errors = [];

  if (req.body.password !== req.body.passwordConf) {
    errors.push('The provided passwords do not match.');
  }

  if (
    !(
      req.body.name &&
      req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf
    )
  ) {
    errors.push('All fields are required.');
  }

  const selectQuery = 'SELECT * FROM customers WHERE username = $1';
  const selectResult = await db.query(selectQuery, [req.body.username]);
  console.log(selectResult);

  if (selectResult.rows.length > 0) {
    errors.push('That username is already taken.');
  }

  if (!errors.length) {
    const insertQuery =
      'INSERT INTO customers (name, username, email, password) VALUES ($1, $2, $3, $4)';
    const password = await bcrypt.hash(req.body.password, 10);
    await db.query(insertQuery, [
      req.body.name,
      req.body.username,
      req.body.email,
      password,
    ]);

    res.redirect('login');
  } else {
    res.render('register', { errors });
  }
});

// login and logout routes completed

// load login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Express' });
});

// user login
router.post('/login', async (req, res) => {
  const errors = [];

  const selectQuery = 'SELECT * FROM customers WHERE username = $1';
  const selectResult = await db.query(selectQuery, [req.body.username]);

  if (selectResult.rows.length === 1) {
    const auth = await bcrypt.compare(
      req.body.password,
      selectResult.rows[0].password
    );

    if (auth) {
      [req.session.user] = selectResult.rows;
      console.log(req.session.user);
      req.session.cart = [];
      req.session.cartCount = 0;
      req.session.nextCartId = 1;
      req.session.save(() => res.redirect('/'));
    } else {
      errors.push('Incorrect username/password');
      res.render('login', { errors });
    }
  } else {
    errors.push('Incorrect username/password');
    res.render('login', { errors });
  }
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
