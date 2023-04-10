
const express = require("express");
const ProductsManager = require("../ProductsManager.js");
const v4 = require("uuid");
const path = require('path');

const productRouter = express.Router();
const data = path.resolve(process.cwd(), "public", "products.json");
const productsManager = new ProductsManager(data);


productRouter.get("/", async (req, res) => {
    const { limit } = req.query;

    try {
        const products = await productsManager.getAll();


        if (limit) {
            res.send(products.slice(0, limit));
            return;
        }
        res.send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

productRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const products = await productsManager.getAll();

        const product = products.find((product) => product.id === Number(pid));
        console.log(product)
        if (!product) {
            res.status(400).send("Producto no encontrado");
            return;
        }
        res.send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

productRouter.post("/", async (req, res) => {
    const newProduct = {
        id: v4(),
        ...req.body,
    };

    try {
        const products = await productsManager.getAll();
        await productsManager.writeAll([...products, newProduct]);
        res.send(newProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

productRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const newProduct = req.body;

    try {
        const products = await productsManager.getAll();
        const productIndex = products.findIndex((product) => product.id === Number(pid));
        if (productIndex === -1) {
            res.status(400).send("Producto no encontrado");
            return;
        }

        products[productIndex] = newProduct;
        await productsManager.writeAll(products);
        res.send(newProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

productRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const products = await productsManager.getAll();
        const productIndex = products.findIndex((product) => product.id === Number(pid));
        if (productIndex === -1) {
            res.status(400).send("Producto no encontrado");
            return;
        }

        products.splice(productIndex, 1);
        await productsManager.writeAll(products);
        res.send("Producto eliminado");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = productRouter;