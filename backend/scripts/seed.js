const db = require('../src/models/db');

// Find or create demo user
const existing = db.prepare("SELECT id FROM users WHERE email = ?").get('demo@expensetrack.local');
let userId;
if (existing) {
  userId = existing.id;
  console.log('✅ Demo user already exists (id=' + userId + ')');
} else {
  const info = db.prepare(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)"
  ).run('Demo User', 'demo@expensetrack.local', 'demo-not-a-real-hash');
  userId = info.lastInsertRowid;
  console.log('✅ Created demo user (id=' + userId + ')');
}

// Default categories
const defaults = [
  { name: 'Salary', type: 'income' },
  { name: 'Freelance', type: 'income' },
  { name: 'Food', type: 'expense' },
  { name: 'Transport', type: 'expense' },
  { name: 'Rent', type: 'expense' },
  { name: 'Utilities', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
  { name: 'Shopping', type: 'expense' }
];

const find = db.prepare("SELECT id FROM categories WHERE user_id = ? AND name = ?");
const insert = db.prepare("INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)");

let added = 0;
for (const c of defaults) {
  if (!find.get(userId, c.name)) {
    insert.run(userId, c.name, c.type);
    added++;
  }
}

console.log('✅ ' + added + ' categories added.');
console.log('\nDemo user id = ' + userId + ' (use this in tests)');
db.close();