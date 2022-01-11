const Joi = require('@hapi/joi');
const { create, findByName } = require('../models/productsModel');
const { invalidData, productExists } = require('../utils/dictionary/messagesDefault');
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
  console.log('retorno findByName', nameExists);

  if (nameExists) throw invalidDataError(productExists, invalidData);
  if (error) throw invalidDataError(error.message, invalidData);

  const id = await create(name, quantity);

  return { _id: id, name, quantity };
};

module.exports = {
  createProduct,
};