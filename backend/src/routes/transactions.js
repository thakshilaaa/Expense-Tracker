const express = require('express');
const router = express.Router();
const c = require('../controllers/transactionController');
router.get('/', c.list);
router.get('/summary', c.summary);
router.post('/', c.create);
router.delete('/:id', c.remove);
module.exports = router;
