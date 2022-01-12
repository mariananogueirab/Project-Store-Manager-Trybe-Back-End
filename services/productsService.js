const Joi = require('@hapi/joi');
const { create, findByName, findAllProducts, findProductById } = require('../models/productsModel');
const { invalidData, productExists, wrongId } = require('../utils/dictionary/messagesDefault');
const { invalidDataError } = require('../utils/functions/errorHandling');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1),
});

const createProduct = async (name, quantity) => {
  const { error } = productSchema.validate({
    name, quantity,
  });

  const nameExists = await findByName(name);

  if (nameExists) throw invalidDataError(productExists, invalidData);
  if (error) throw invalidDataError(error.message, invalidData);

  const id = await create(name, quantity);

  return { _id: id, name, quantity };
};

const showAllProducts = async () => {
  const allProducts = await findAllProducts();
  return allProducts;
};

const showProductById = async (id) => {
  const product = await findProductById(id);
  console.log('service: ', product);
  if (!product) throw invalidDataError(wrongId, invalidData);
  return product;
};

module.exports = {
  createProduct,
  showAllProducts,
  showProductById,
};