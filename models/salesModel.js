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

module.exports = {
  registerSale,
  findSaleById,
};