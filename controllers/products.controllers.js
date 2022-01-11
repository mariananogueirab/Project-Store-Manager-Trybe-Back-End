const { createProduct } = require('../services/productsService');
const { created } = require('../utils/dictionary/statusCode');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');

const productCreate = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await createProduct(name, quantity);
    return res.status(created).json(newProduct);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

module.exports = {
  productCreate,
};