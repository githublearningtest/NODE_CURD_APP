const express = require('express');
const multer = require('multer');
const Item = require('../models/Item');
const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('items', { items });
});

router.post('/add', upload.single('file'), async (req, res) => {
  const { name, description } = req.body;
  const file = req.file ? req.file.path : null;
  const item = new Item({ name, description, file });
  await item.save();
  res.redirect('/items');
});

router.post('/update/:id', upload.single('file'), async (req, res) => {
  const { name, description } = req.body;
  const file = req.file ? req.file.path : req.body.currentFile;
  await Item.findByIdAndUpdate(req.params.id, { name, description, file });
  res.redirect('/items');
});

router.post('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/items');
});

module.exports = router;
