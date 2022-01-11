const express = require('express');
const { productCreate } = require('../controllers/products.controllers');

const router = express.Router();

router.post('/', productCreate);

module.exports = router;