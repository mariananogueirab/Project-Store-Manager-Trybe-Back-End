const Joi = require('@hapi/joi');
const {
  registerSale,
  findSaleById,
  findAllSales,
  deleteSaleById,
  updateSaleById,
} = require('../models/salesModel');
const { findProductById } = require('../models/productsModel');
const { invalidSale,
  invalidData,
  saleNotFound,
  notFound,
  wrongSaleId,
} = require('../utils/dictionary/messagesDefault');
const { invalidDataError } = require('../utils/functions/errorHandling');
/* const { updateProductQuantity } = require('../models/productsModel'); */

const saleSchema = Joi.object({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const saleIdSchema = Joi.object({
  saleId: Joi.string().length(24).required(),
});

const validateSaleId = (saleId, code, message) => {
  const { error } = saleIdSchema.validate({
    saleId,
  });
  if (error) throw invalidDataError(message, code); 
};

const validateProductId = async (id) => {
  const idExists = await findProductById(id);

  if (!idExists) throw invalidDataError(invalidSale, invalidData);
};

const validateSale = (productId, quantity) => {
  const { error } = saleSchema.validate({
    productId,
    quantity,
  });
  if (error) throw invalidDataError(invalidSale, invalidData);
};

const validateAllSales = async (lista) => Promise.all(
  lista.map(async (item) => {
    await validateProductId(item.productId);
    validateSale(item.productId, item.quantity);
  }),
);

/* const updateQuantity = async (lista) => Promise.all(
  lista.map(async (item) => {
    await updateProductQuantity(item.productId, item.quantity);
  }),
); */

const salesRegister = async (body) => {
  await validateAllSales(body);
  
  const id = await registerSale(body);
  return { _id: id, itensSold: body };
};

const showSaleById = async (id) => {
  validateSaleId(id, notFound, saleNotFound);
  const sale = await findSaleById(id);
  if (!sale) throw invalidDataError(saleNotFound, notFound);
  return sale;
};

const showAllSales = async () => {
  const allSales = await findAllSales();
  return allSales;
};

const deleteSale = async (id) => {
  validateSaleId(id, invalidData, wrongSaleId);
  const sale = await deleteSaleById(id);
  if (!sale) throw invalidDataError(wrongSaleId, invalidData);
  return sale;
};

const updateSale = async (saleId, itensSold) => {
  await validateAllSales(itensSold);

  const sale = await updateSaleById(saleId, itensSold);
  return sale;
};

module.exports = {
  salesRegister,
  showSaleById,
  showAllSales,
  deleteSale,
  updateSale,
};
