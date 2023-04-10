const fs = require("fs");

class ProductsManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.filePath);
            return JSON.parse(data);
        } catch (err) {
            console.log(err);
        }
    }

    async writeAll(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data))
        } catch (err) {
            throw err;
        }
    }


    async add(product) {
        try {
            let data = await this.getAll();
            if (data.length > 0) {
                let nuevoid = data[data.length - 1].id + 1;
                const newProduct = {
                    id: nuevoid,
                    ...product
                };

                data.push(newProduct);
                await fs.promises.writeAll('products.json')
                return newProduct.id
            } else {
                const newProduct = {
                    id: 1,
                    ...product
                };

                data.push(newProduct);
                await fs.promises.writeAll('products.json')
                return newProduct.id

            }
        } catch (err) {
            throw err;
        }
    }

    async update(productId, updateProduct) {
        try {
            const products = await this.getAll();

            const index = products.findIndex((products) => products.id === productId);
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }

            products[index] = { ...products[index], ...updateProduct };

            await this.writeAll('products.json');
        } catch (err) {
            throw err;
        }
    }

    async delete(productId) {
        try {
            const products = await this.getAll();

            const index = products.findIndex((product) => product.id === productId);
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }
            products.splice(index, 1);
            await this.writeAll('products.json')
        } catch (err) {
            throw err;
        }
    }
};

module.exports = ProductsManager;