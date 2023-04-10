const express = require("express");
const CartsManager = require("../CartsManager.js");
const ProductsManager = require("../ProductsManager.js");
const v4 = require("uuid");
const path = require("path");

const cart = express.Router();
const cartsManager = new CartsManager(
    path.resolve(process.cwd(), "public", "carts.json")
);
const productsManager = new ProductsManager(
    path.resolve(process.cwd(), "public", "products.json")
);

cart.get("/", async (req, res) => {
    try {
        const carts = await cartsManager.getAll();
        res.send(carts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

cart.post("/", async (req, res) => {
    const newCart = {
        id: v4(),
        products: [],
    }

    try {
        const carts = await cartsManager.getAll();
        await cartsManager.writeAll([...carts, newCart]);
        res.send(newCart);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

cart.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const carts = await cartsManager.getAll();
        const cart = carts.find((cart) => cart.id === cid);
        if (!cart) {
            res.status(400).send("Carrito no encontrado");
            return;
        }
        res.send(cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

cart.post("/:/cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const carts = await cartsManager.getAll();
        const cart = carts.find((cart) => cart.id === cid);
        if (!cart) {
            res.status(400).send("Carrito no encontrado");
            return;
        }
        const products = await productsManager.getAll();
        const product = products.find((product) => product.id === pid);
        if (!product) {
            res.status(400).send("Producto no encontrado");
            return;
        }
        const productInCart = cart.products.find((product) => product.id === pid);
        if (productInCart) {
            productInCart.quantity++;
            await cartsManager.writeAll(carts);
            res.send("Producto agregado al carrito");
            return;
        } else {
            cart.products.push({ id: pid, quantity: 1 });
            await cartsManager.writeAll(carts);
            res.send("Producto agregado al carrito");
            return;
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = cart;