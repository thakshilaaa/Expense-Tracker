const bcrypt = require('bcryptjs');
const db = require('../config/database');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // 1. Required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }

    // 2. Validate
    const cleanName  = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    if (cleanName.length < 2)      return res.status(400).json({ error: 'name must be at least 2 characters' });
    if (!EMAIL_REGEX.test(cleanEmail)) return res.status(400).json({ error: 'email is not valid' });
    if (password.length < 8)       return res.status(400).json({ error: 'password must be at least 8 characters' });

    // 3. Duplicate email?
    const existing = db.prepare('SELECT user_id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(409).json({ error: 'email already registered' });
    }

    // 4. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 5. Insert
    const result = db.prepare(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
    ).run(cleanName, cleanEmail, passwordHash);

    // 6. Never return the hash!
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        user_id: result.lastInsertRowid,
        name: cleanName,
        email: cleanEmail,
      },
    });
  } catch (err) {
    console.error('[register]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register };
