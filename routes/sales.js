const express = require('express');
const { register, getSaleById, getAllSales } = require('../controllers/sales.controllers');

const router = express.Router();

router.post('/', register);
router.get('/:id', getSaleById);
router.get('/', getAllSales);

module.exports = router;