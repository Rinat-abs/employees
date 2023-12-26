const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { all, add, remove, edit, employee } = require('../controllers/employees');


// /api/employees
router.get('/', auth, all)

// /api/employees/:id
router.get('/:id', auth, employee)

// /api/employees/add
router.post('/add', auth, add)

// /api/employees/remove
router.post('/remove', auth, remove)

// /api/employees/remove
router.put('/edit', auth, edit)

module.exports = router