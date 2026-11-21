const db = require('../models/db');

exports.list = (req, res) => {
  try {
    const userId = req.query.user_id || 1;
    const rows = db.prepare(`
      SELECT t.*, c.name AS category_name, c.type AS category_type
      FROM transactions t
      JOIN categories c ON c.id = t.category_id
      WHERE t.user_id = ?
      ORDER BY t.date DESC, t.id DESC
    `).all(userId);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = (req, res) => {
  try {
    const { amount, description, date, category_id, user_id } = req.body;
    if (!amount || !date || !category_id) {
      return res.status(400).json({ error: 'amount, date, category_id are required' });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'amount must be a positive number' });
    }
    const userId = user_id || 1;
    const cat = db.prepare(
      "SELECT id FROM categories WHERE id = ? AND user_id = ?"
    ).get(category_id, userId);
    if (!cat) return res.status(400).json({ error: 'category_id not found for this user' });

    const info = db.prepare(
      "INSERT INTO transactions (user_id, category_id, amount, description, date) VALUES (?, ?, ?, ?, ?)"
    ).run(userId, category_id, amount, description || '', date);

    const created = db.prepare(`
      SELECT t.*, c.name AS category_name, c.type AS category_type
      FROM transactions t JOIN categories c ON c.id = t.category_id
      WHERE t.id = ?
    `).get(info.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.remove = (req, res) => {
  try {
    const info = db.prepare("DELETE FROM transactions WHERE id = ?").run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'transaction not found' });
    res.json({ deleted: Number(req.params.id) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.summary = (req, res) => {
  try {
    const userId = req.query.user_id || 1;
    const totals = db.prepare(`
      SELECT c.type AS type, COALESCE(SUM(t.amount), 0) AS total, COUNT(t.id) AS count
      FROM transactions t JOIN categories c ON c.id = t.category_id
      WHERE t.user_id = ? GROUP BY c.type
    `).all(userId);

    let income = 0, expense = 0;
    for (const row of totals) {
      if (row.type === 'income') income = row.total;
      if (row.type === 'expense') expense = row.total;
    }

    const byCategory = db.prepare(`
      SELECT c.name AS category, c.type AS type, SUM(t.amount) AS total
      FROM transactions t JOIN categories c ON c.id = t.category_id
      WHERE t.user_id = ? GROUP BY c.id ORDER BY total DESC
    `).all(userId);

    res.json({ income, expense, balance: income - expense, byCategory });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
