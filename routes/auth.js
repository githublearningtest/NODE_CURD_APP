const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    res.redirect('/items');
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password, confirmPassword, terms } = req.body;
  
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match!');
  }
  
  if (!terms) {
    return res.status(400).send('You must agree to the terms and conditions!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  try {
    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.status(400).send('Username already exists!');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
