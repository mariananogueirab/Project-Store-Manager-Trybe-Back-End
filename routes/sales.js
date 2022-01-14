const express = require('express');
const {
  register,
  getSaleById,
  getAllSales,
  saleDelete,
} = require('../controllers/sales.controllers');

const router = express.Router();

router.post('/', register);
router.get('/:id', getSaleById);
router.get('/', getAllSales);
router.delete('/:id', saleDelete);

module.exports = router;