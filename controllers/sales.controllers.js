const { salesRegister, showSaleById, showAllSales } = require('../services/salesService');
const { unprocessableEntity, success, notFound } = require('../utils/dictionary/statusCode');

const register = async (req, res, _next) => {
  try {
    const { body } = req;
    console.log('controlle body: ', body);
    const sales = await salesRegister(body);
    console.log('controller sales: ', sales);
    return res.status(success).json(sales);
  } catch (error) {
    console.log('controller error: ', error);
    return res.status(unprocessableEntity).json(error);
  }
};

const getSaleById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sale = await showSaleById(id);
    return res.status(success).json(sale);
  } catch (error) {
    return res.status(notFound).json(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const allSales = await showAllSales();
    return res.status(success).json(allSales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getSaleById,
  getAllSales,
};