const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// MongoDB Schema
const Message = mongoose.model('Message', {
  name: String,
  message: String,
});

// Routes
app.post('/submit', async (req, res) => {
  const { name, message } = req.body;
  await Message.create({ name, message });
  res.redirect('/');
});

app.get('/messages', async (req, res) => {
  const messages = await Message.find().sort({ _id: -1 });
  res.json(messages);
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listen on all interfaces, not just localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
