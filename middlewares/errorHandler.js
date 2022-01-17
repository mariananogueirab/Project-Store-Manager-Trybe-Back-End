module.exports = (err, _req, res, _next) => {
  console.error(err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message, desc: err.description });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};
