require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Serve the frontend files ---
app.use(express.static(path.join(__dirname, '../frontend')));

// --- API Routes ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ExpenseTrack API is running' });
});

app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/transactions', require('./src/routes/transactions'));

// Fallback to 404 for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ error: 'API Not found', path: req.path }));

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('Dashboard: http://localhost:' + PORT);
  console.log('API: http://localhost:' + PORT + '/api');
  console.log('Press Ctrl+C to stop.');
  console.log('');
});
