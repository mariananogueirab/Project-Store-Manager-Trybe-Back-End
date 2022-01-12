const connect = require('./connection');

const create = async (name, quantity) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('products').insertOne({ name, quantity });
  return insertedId;
};

const findByName = async (name) => {
  const conn = await connect();
  const nameExists = await conn.collection('products').findOne({ name });
  return nameExists;
};

const findAllProducts = async () => {
  const conn = await connect();
  const products = await conn.collection('products').find().toArray();
  console.log(products);
  return products;
};

const findProductById = async (id) => {
  console.log('id model: ', id)
  const conn = await connect();
  const product = await conn.collection('products').findOne({ _id: id });
  console.log('model: ', product);
  return product;
};

module.exports = {
 create,
 findByName,
 findAllProducts,
 findProductById,
};