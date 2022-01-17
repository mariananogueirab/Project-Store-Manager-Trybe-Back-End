const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'sales';

const registerSale = async (sales) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(DB_COLLECTION).insertOne({ itensSold: sales });
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
  console.log('sales model: ', sales);
  return sales;
};

const updateSaleById = async (saleId, itensSold) => {
  const conn = await connect();
  await conn.collection(DB_COLLECTION)
    .updateOne({ _id: ObjectId(saleId) }, { $set: { itensSold } });
    const sale = await findSaleById(saleId);
  return sale;
};

const deleteSaleById = async (id) => {
  const conn = await connect();
  const sale = await findSaleById(id);
  if (sale) {
    await conn.collection(DB_COLLECTION)
      .deleteOne({ _id: ObjectId(id) }, {});
      return sale;
  }
  return false;
};

module.exports = {
  registerSale,
  findSaleById,
  findAllSales,
  deleteSaleById,
  updateSaleById,
};