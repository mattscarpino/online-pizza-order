const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  let user = false;
  if (req.session.user) {
    user = true;
  }
  res.render('index', { title: 'Express', user });
});

module.exports = router;
