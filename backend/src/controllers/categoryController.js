const db = require('../models/db');

exports.list = (req, res) => {
  try {
    const userId = req.query.user_id || 1;
    const rows = db.prepare(
      "SELECT * FROM categories WHERE user_id = ? ORDER BY type, name"
    ).all(userId);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = (req, res) => {
  try {
    const { name, type, user_id } = req.body;
    if (!name || !type) return res.status(400).json({ error: 'name and type are required' });
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'type must be income or expense' });
    }
    const userId = user_id || 1;
    const info = db.prepare(
      "INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)"
    ).run(userId, name, type);
    const created = db.prepare("SELECT * FROM categories WHERE id = ?").get(info.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.remove = (req, res) => {
  try {
    const info = db.prepare("DELETE FROM categories WHERE id = ?").run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'category not found' });
    res.json({ deleted: Number(req.params.id) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
