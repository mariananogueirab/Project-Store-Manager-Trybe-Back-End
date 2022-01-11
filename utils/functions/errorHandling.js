const invalidDataError = (message, code) => ({ 
  err: {
    code,
    message,
  },
});

module.exports = {
  invalidDataError,
};