const fs = require("fs");

class CartsManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.filePath);
            return JSON.parse(data);
        } catch (err) {
            throw err;
        }
    }

    async writeAll(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    }

    async addProduct(cartId, productId) {
        try {
            const carts = await this.getAll();

            const cart = carts.find((cart) => cart.id === cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            cart.products.push(productId);

            await this.writeAll(carts);
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const carts = await this.getAll();

            const cart = carts.find((cart) => cart.id === cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            const index = cart.products.findIndex((product) => product === productId);
            if (index === -1) {
                throw new Error("Producto no encontrado");
            }

            cart.products.splice(index, 1);

            await this.writeAll(carts);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = CartsManager;