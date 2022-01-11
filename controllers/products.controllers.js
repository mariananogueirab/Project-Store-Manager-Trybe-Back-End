const { createProduct, showAllProducts } = require('../services/productsService');
const { created } = require('../utils/dictionary/statusCode');
const { unprocessableEntity, success } = require('../utils/dictionary/statusCode');

const productCreate = async (req, res, _next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await createProduct(name, quantity);
    return res.status(created).json(newProduct);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

const getAllProducts = async (req, res, _next) => {
  const allProducts = await showAllProducts();
  return res.status(success).json({ products: allProducts });
};

module.exports = {
  productCreate,
  getAllProducts,
};