# ExpenseTrack

A personal expense tracker built as a QA portfolio project.

## Tech Stack
- **Backend:** Node.js + Express
- **Database:** SQLite (file-based, zero-config)
- **Testing:** Postman (API Automation)

## Project Structure
- `backend/` - Node.js API server
- `database/` - SQLite database file & schema
- `docs/` - QA documentation (Test Plan, Bug Reports)
- `tests/` - Postman automation collections

## QA Status
? **28 Automated API Tests Passing**

See [docs/test-plan.md](docs/test-plan.md) for the full QA test plan and traceability matrix.

## How to Run the Backend
1. `cd backend`
2. `npm install`
3. `node scripts/init-db.js`
4. `node scripts/seed.js`
5. `node server.js`

## How to Run the Tests
1. Open Postman.
2. Import `backend/tests/postman/ExpenseTrack.postman_collection.json`.
3. Click **Run**.
