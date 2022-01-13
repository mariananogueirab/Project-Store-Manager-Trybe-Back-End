const express = require('express');
const {
  productCreate,
  getAllProducts,
  getProduct,
  productUpdate,
} = require('../controllers/products.controllers');

const router = express.Router();

router.post('/', productCreate);
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', productUpdate);

module.exports = router;