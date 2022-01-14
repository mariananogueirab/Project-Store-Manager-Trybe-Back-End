const express = require('express');
const { register, getSaleById } = require('../controllers/sales.controllers');

const router = express.Router();

router.post('/', register);
router.get('/:id', getSaleById);

module.exports = router;