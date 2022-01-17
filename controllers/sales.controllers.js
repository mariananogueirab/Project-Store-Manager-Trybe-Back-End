const {
  salesRegister,
  showSaleById,
  showAllSales,
  deleteSale,
  updateSale,
} = require('../services/salesService');
const { unprocessableEntity, success, notFound } = require('../utils/dictionary/statusCode');

const register = async (req, res, _next) => {
  try {
    const { body } = req;
    const sales = await salesRegister(body);
    return res.status(success).json(sales);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

const getSaleById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sale = await showSaleById(id);
    return res.status(success).json(sale);
  } catch (error) {
    console.log('error by id: ', error);
    return res.status(notFound).json(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const allSales = await showAllSales();
    return res.status(success).json({ sales: allSales });
  } catch (error) {
    next(error);
  }
};

const saleDelete = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sale = await deleteSale(id);

    return res.status(success).json(sale);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

const saleUpdate = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    const sale = await updateSale(id, itensSold);

    return res.status(success).jason(sale);
  } catch (error) {
    return res.status(unprocessableEntity).json(error);
  }
};

module.exports = {
  register,
  getSaleById,
  getAllSales,
  saleDelete,
  saleUpdate,
};