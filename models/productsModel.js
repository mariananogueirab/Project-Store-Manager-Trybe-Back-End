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

module.exports = {
 create,
 findByName,
};