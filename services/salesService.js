const Joi = require('@hapi/joi');
const { registerSale, findSaleById, findAllSales } = require('../models/salesModel');
const { findProductById } = require('../models/productsModel');
const { invalidSale,
  invalidData,
  wrongId,
  saleNotFound,
  notFound,
} = require('../utils/dictionary/messagesDefault');
const { invalidDataError } = require('../utils/functions/errorHandling');

const saleSchema = Joi.object({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateSaleId = async (id) => {
  const idExists = await findProductById(id);

  if (!idExists) throw invalidDataError(invalidSale, invalidData);

  return idExists;
};

const validateSale = async (productId, quantity) => {
  const { error } = saleSchema.validate({
    productId,
    quantity,
  });
  if (error) throw invalidDataError(wrongId, invalidData);
};

const salesRegister = async (body) => {
  body.forEach(async ({ productId, quantity }) => {
    await validateSaleId(productId);
    await validateSale(productId, quantity);
  });
  const id = await registerSale(body);
  console.log('service body: ', body);
  return { _id: id, itensSold: body };
};

const showSaleById = async (id) => {
  const sale = await findSaleById(id);
  if (!sale) throw invalidDataError(saleNotFound, notFound);
  return sale;
};

const showAllSales = async () => {
  const allSales = await findAllSales();
  return allSales;
};

module.exports = {
  salesRegister,
  showSaleById,
  showAllSales,
};
