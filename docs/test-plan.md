# ExpenseTrack API - QA Test Plan

**Version:** 1.0  
**Author:** Nethmi  
**Date:** 2026-11-21  
**Test Environment:** Local Development (Node.js + Express + SQLite)

---

## 1. Objective
The purpose of this test plan is to verify the functional correctness, data validation, and business logic of the ExpenseTrack REST API.

## 2. Scope
**In Scope:**
- Categories API (`GET`, `POST`, `DELETE`)
- Transactions API (`GET`, `POST`, `DELETE`)
- Summary/Analytics API (`GET`)
- Input validation and negative testing (e.g., missing fields, negative numbers)

**Out of Scope:**
- UI/Frontend testing (not yet built)
- Authentication/Authorization (currently hardcoded to User ID 1)
- Performance/Load testing

## 3. Test Strategy
Testing is performed via **API automation** using Postman. 
- **Functional Tests:** Ensure endpoints return the correct status codes and expected JSON payloads.
- **Negative Tests:** Ensure the API rejects invalid input (e.g., negative amounts, invalid category types) with `400 Bad Request`.
- **Data Integrity Tests:** Ensure foreign keys are respected and math logic (Balance = Income - Expense) is correct.

## 4. Test Environment & Data
- **Base URL:** `http://localhost:3000`
- **Database:** SQLite (`expensetrack.db`)
- **Seed Data:** 1 Demo User, 8 Categories.
- **Execution:** Postman Collection Runner (`ExpenseTrack.postman_collection.json`)

## 5. Traceability Matrix

| Req ID | Feature | Test Case Description | Automated in Postman |
|--------|---------|-----------------------|----------------------|
| REQ-01 | Health | API responds with 200 OK | ? |
| REQ-02 | Categories | Retrieve list of categories | ? |
| REQ-03 | Categories | Create a valid category | ? |
| REQ-04 | Categories | Reject category missing `name` | ? |
| REQ-05 | Categories | Reject category with invalid `type` | ? |
| REQ-06 | Categories | Delete a category | ? |
| REQ-07 | Categories | Return 404 for deleting missing category | ? |
| REQ-08 | Transactions | Create a valid income/expense | ? |
| REQ-09 | Transactions | Reject transaction missing `amount` | ? |
| REQ-10 | Transactions | Reject negative `amount` | ? |
| REQ-11 | Transactions | Reject invalid `category_id` | ? |
| REQ-12 | Transactions | Retrieve list with category names | ? |
| REQ-13 | Transactions | Retrieve correct Summary totals | ? |
| REQ-14 | Transactions | Delete a transaction | ? |

## 6. Entry & Exit Criteria
**Entry Criteria:**
- Server is running (`node server.js`)
- Database is initialized and seeded (`node scripts/init-db.js` && `node scripts/seed.js`)

**Exit Criteria:**
- 100% of Postman tests pass.
- Current Status: **28 / 28 Passed (0 Failed)**

## 7. How to Reproduce These Results
1. Start the backend server.
2. Open Postman and import `tests/postman/ExpenseTrack.postman_collection.json`.
3. Click "Run" on the collection.
4. Verify 28 tests pass.
