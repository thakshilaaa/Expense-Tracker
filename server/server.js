require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  try {
    const result = db.prepare('SELECT 1 AS ok').get();
    res.json({
      status: 'ok',
      message: 'ExpenseTrack API is running',
      database: result.ok === 1 ? 'SQLite connected' : 'SQLite error',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Feature routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('ExpenseTrack API is running. Visit <a href="/api/health">/api/health</a>');
});

app.listen(PORT, () => {
  console.log(`\n✅ Server running: http://localhost:5000`);
  console.log(`   Health:         http://localhost:5000/api/health`);
  console.log(`   Register:       POST http://localhost:5000/api/auth/register\n`);
});
