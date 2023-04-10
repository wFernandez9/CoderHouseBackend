const fs = require('fs');
const { dirname } = require('path');
const path = require("path");

class ProductManager {
    constructor() {

        this.file = path.join(__dirname, './products.json');
    }

    async getProdutcs() {
        if (fs.existsSync(this.file)) {
            let rawdata = await fs.promises.readFile(this.file);
            let resultado = JSON.parse(rawdata)
            return resultado;
        }
        else {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))
            let rawdata = await fs.promises.readFile(this.file);
            let resultado = JSON.parse(rawdata);
            return resultado;
        }
    }

    async addProducts(producto) {
        let data = await this.getProdutcs();
        if (data.length > 0) {
            let nuevoid = data[data.length - 1].id + 1;
            const newProduct = {
                id: nuevoid,
                ...producto
            };

            data.push(newProduct);
            await fs.promises.writeFile(this.file, JSON.stringify(data, null, 2))
            return newProduct.id
        }
        else {
            const newProduct = {
                id: 1,
                ...producto
            };

            data.push(newProduct);
            await fs.promises.writeFile(this.file, JSON.stringify(data, null, 2))
            return newProduct.id
        }
    }

    async getProductsById(id) {
        let data = await this.getProdutcs();
        let byId = data.find(e => e.id == id);
        return byId;
    }

    async updateProduct(id, upgrade) {
        let data = await this.getProdutcs();
        let update = [];
        data.forEach(element => {
            if (element.id == id) {
                let producto = { id: id, ...upgrade }
                update.push(producto);
            } else {
                update.push(element)
            }
        }
        );

        await fs.promises.writeFile(this.file, JSON.stringify(update, null, 2))

    }

    async deleteProduct(id) {
        let data = await this.getProdutcs();
        let del = data.filter(e => e.id != id);
        await fs.promises.writeFile(this.file, JSON.stringify(del, null, 2))
    }
}


let producto1 = {
    title: "Naranja",
    description: "Jugasa",
    price: 15,
    thumbnail: "https://media.istockphoto.com/id/185284489/es/foto/naranja.jpg?s=612x612&w=0&k=20&c=V_kmzGGofV9oTdQMU-SfT4Y9n3q9ksFZliED5O_eYPE=",
    code: 3,
    stock: 1
}

let producto2 = {
    title: "Uvas",
    description: "Jugasa",
    price: 15,
    thumbnail: "https://media.istockphoto.com/id/185284489/es/foto/naranja.jpg?s=612x612&w=0&k=20&c=V_kmzGGofV9oTdQMU-SfT4Y9n3q9ksFZliED5O_eYPE=",
    code: 3,
    stock: 1
}

let producto = new ProductManager();
//producto.fileExists();
async function ejecution() {
    //await producto.addProducts(producto1);
    //await producto.addProducts(producto2);
    //console.log(await producto.getProductsById(3));


    /*await producto.updateProduct(3, {
      title: 'Naranja',
      description: 'Horrorosa',
      price: 17, //cambio
      thumbnail: 'https://media.istockphoto.com/id/185284489/es/foto/naranja.jpg?s=612x612&w=0&k=20&c=V_kmzGGofV9oTdQMU-SfT4Y9n3q9ksFZliED5O_eYPE=',
      code: 3,
      stock: 1
    });*/

    //await producto.deleteProduct(1);
}

ejecution();
module.exports = ProductManager;