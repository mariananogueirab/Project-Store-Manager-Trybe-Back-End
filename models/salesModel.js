const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'sales';

const registerSale = async (sales) => {
  console.log('model sales:', sales)
  const conn = await connect();
  const { insertedId } = await conn.collection(DB_COLLECTION).insertMany(sales);
  console.log('model id: ', insertedId);
  return insertedId;
};

const findSaleById = async (id) => {
  const conn = await connect();
  const sale = await conn.collection(DB_COLLECTION)
    .findOne({ _id: ObjectId(id) });
  return sale;
};

const findAllSales = async () => {
  const conn = await connect();
  const sales = await conn.collection(DB_COLLECTION).find().toArray();
  return sales;
};

/* const updateSaleById = async (saleId, productId, quantity) => {

}; */

const deleteSaleById = async (id) => {
  const conn = await connect();
  const sale = await findSaleById(id);
  await conn.collection(DB_COLLECTION)
    .remove({ _id: ObjectId(id) }, {});
  return sale;
};

module.exports = {
  registerSale,
  findSaleById,
  findAllSales,
  deleteSaleById,
};