const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const multer = require('multer'); // Require multer

const app = express();

// Static files
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/itemManagementApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process on connection failure
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'secret',
  resave: false, // Save session only if modified
  saveUninitialized: false // Don't save uninitialized session
}));

// View engine setup
app.set('view engine', 'ejs');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Routes
app.use('/items', itemRoutes);
app.use('/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Example route for handling file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // Multer middleware has successfully uploaded 'file' to 'uploads/' directory
  res.send('File uploaded successfully');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
