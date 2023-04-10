const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');

const productManager = new ProductManager();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/products', async (req, res) => {
    const limit = req.query.limit || null;
    const products = await productManager.getProdutcs();
    if (limit) {
        res.send(products.slice(0, limit));
    } else {
        res.send(products);
    }
});

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductsById(productId);
    if (!product) {
        res.status(404).send({ error: 'Producto no encontrado' });
    } else {
        res.send(product);
    }
});

app.listen(8080, () => {
    console.log('Servidor corriendo en puerto 8080');
});