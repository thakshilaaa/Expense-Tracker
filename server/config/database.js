const Database = require('better-sqlite3');
const path = require('path');

// Store the DB file in ExpenseTrack/database/expensetrack.db
const dbPath = path.resolve(__dirname, '..', '..', 'database', 'expensetrack.db');
const db = new Database(dbPath);

// Good defaults for a fresh app
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

console.log(`[DB] Connected to SQLite: ${dbPath}`);

module.exports = db;
