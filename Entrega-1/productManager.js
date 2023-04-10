class ProductManager {
    constructor(products = []) {
        this.products = products;
        this.nextProductId = 1;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Error: Todos los campos son obligatorios');
            return;
        }

        if (this.products.some(p => p.code === code)) {
            console.log('Error: El código del producto ya existe');
            return;
        }

        const newProduct = {
            id: this.nextProductId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log('Error: Producto no encontrado');
        }
        return product;
    }
}

const productManager = new ProductManager();

// Crear un producto de ejemplo
const newProduct = {
    title: 'Manzana',
    description: 'Jugosa',
    price: 1000,
    thumbnail: 'https://biotrendies.com/wp-content/uploads/2015/06/manzana.jpg',
    code: '10',
    stock: 10
};

// Agregar el producto a la lista de productos
productManager.addProduct(newProduct);

// Obtener la lista de productos actualizada
const products = productManager.getProducts();
console.log(products);