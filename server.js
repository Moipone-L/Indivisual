// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory user store for simplicity (use a real database for production)
const users = [];

// Secret key for JWT (keep this safe in production)
const JWT_SECRET = 'mySecretKey';

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: 'User registered successfully!' });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Products route (sample data for demonstration)
app.get('/api/products', (req, res) => {
  res.json([{ id: 1, name: 'Product A', quantity: 10 }, { id: 2, name: 'Product B', quantity: 5 }]);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
