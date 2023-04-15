const express = require("express");
const productRouter = require("./routes/products.js");
const cart = require("./routes/cart.js");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cart);

const port = 8080;

app.listen(port, () => {
    console.log('Servidor en puerto 8080')
});