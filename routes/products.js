const express = require('express');
const {
  productCreate,
  getAllProducts,
  getProduct,
} = require('../controllers/products.controllers');

const router = express.Router();

router.post('/', productCreate);
router.get('/', getAllProducts);
router.get('/:id', getProduct);

module.exports = router;