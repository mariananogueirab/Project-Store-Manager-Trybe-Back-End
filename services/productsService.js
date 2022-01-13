const Joi = require('@hapi/joi');
const { create,
  findByName,
  findAllProducts,
  findProductById,
  updateProductById,
  deleteProductById,
} = require('../models/productsModel');
const { invalidData, productExists, wrongId } = require('../utils/dictionary/messagesDefault');
const { invalidDataError } = require('../utils/functions/errorHandling');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const idSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const validateProduct = (name, quantity) => {
  const { error } = productSchema.validate({
    name, quantity,
  });
  if (error) throw invalidDataError(error.message, invalidData);
};

const validateId = (id) => {
  const { error } = idSchema.validate({
    id,
  });
  if (error) throw invalidDataError(wrongId, invalidData);
};

const createProduct = async (name, quantity) => {
  validateProduct(name, quantity);

  const nameExists = await findByName(name);

  if (nameExists) throw invalidDataError(productExists, invalidData);

  const id = await create(name, quantity);

  return { _id: id, name, quantity };
};

const showAllProducts = async () => {
  const allProducts = await findAllProducts();
  return allProducts;
};

const showProductById = async (id) => {
  validateId(id);
  const product = await findProductById(id);
  
  if (!product) throw invalidDataError(wrongId, invalidData);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  validateProduct(name, quantity);
  validateId(id);
  const product = await updateProductById(id, name, quantity);
  return product;
};

const deleteProduct = async (id) => {
  const product = await deleteProductById(id);
  if (!product) throw invalidDataError(wrongId, invalidData);
  return product;
};

module.exports = {
  createProduct,
  showAllProducts,
  showProductById,
  updateProduct,
  deleteProduct,
};