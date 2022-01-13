const express = require('express');
const products = require('./routes/products');
const sales = require('./routes/sales');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use('/sales', sales);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Teste, escutando na porta ${PORT}`));
