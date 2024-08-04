const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  file: { type: String }, // Add this line for storing the file path
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
