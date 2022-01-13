const { ObjectId } = require('mongodb');
const connect = require('./connection');

const DB_COLLECTION = 'products';

const create = async (name, quantity) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(DB_COLLECTION).insertOne({ name, quantity });
  return insertedId;
};

const findByName = async (name) => {
  const conn = await connect();
  const nameExists = await conn.collection(DB_COLLECTION).findOne({ name });
  return nameExists;
};

const findAllProducts = async () => {
  const conn = await connect();
  const products = await conn.collection(DB_COLLECTION).find().toArray();
  return products;
};

const findProductById = async (id) => {
  const conn = await connect();
  const product = await conn.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
 create,
 findByName,
 findAllProducts,
 findProductById,
};