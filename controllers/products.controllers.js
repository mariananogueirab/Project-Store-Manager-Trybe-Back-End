const { createProduct,
  showAllProducts,
  showProductById,
  updateProduct,
  deleteProduct,
} = require('../services/productsService');
const { unprocessableEntity, success, created } = require('../utils/dictionary/statusCode');

const productCreate = async (req, res, _next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await createProduct(name, quantity);
    return res.status(created).json(newProduct);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await showAllProducts();
    return res.status(success).json({ products: allProducts });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const product = await showProductById(id);

    return res.status(success).json(product);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

const productUpdate = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await updateProduct(id, name, quantity);

    return res.status(success).json(product);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

const productDelete = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);

    return res.status(success).json(product);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

module.exports = {
  productCreate,
  getAllProducts,
  getProduct,
  productUpdate,
  productDelete,
};