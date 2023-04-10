const socket = io()

socket.on("producto-nuevo", (data) => {
    renderProducts(data);
});

socket.on("productoABorrar", (del) => {
    renderProducts(del)
})

const products = [];

const allProduct = async () => {
    const response = await fetch('./static/productos.json')
    const data = await response.json()
    return data
}

const renderProducts = async (prod) => {

    const product = await allProduct()

    products.length < 1 && products.push(product)

    if (typeof prod === 'object') {

        if (prod !== undefined && prod !== -1) {
            products[0].push(prod)
        }
    } else if (prod === -1) {
        alert('el codigo introducido no existe')
        return
    } else {

        products[0].splice(prod, 1)
    }

    const list = products[0].map((prod) => {
        return `<div class="card" style="width: 15rem; margin: 5px">
                    <div class="card-body">
                        <h5 class="card-title">${prod.title}</h5>
                        <p class="card-text"> ${prod.description}</p>
                        <p class="card-text">PRECIO: $${prod.price}</p>
                        <p class="card-text">CATEGORIA: ${prod.category}</p>
                        <p class="card-text">Codigo: ${prod.code}</p>
                     </div>
                 </div>`
    })
        .join(' ')
    document.getElementById('containerCards').innerHTML = list
}

renderProducts()


const addProduct = (e) => {
    e.preventDefault()
    const prod = {
        title: document.getElementById('nombre').value,
        description: document.getElementById('descripcion').value,
        price: document.getElementById('precio').value,
        category: document.getElementById('categoria').value,
        code: document.getElementById('codigo').value
    }
    socket.emit('newProduct', prod)
    formulario.reset()
}


const eliminarProducto = (e) => {
    e.preventDefault()
    const deleteProduct = document.getElementById('codigoEliminar').value
    const productoEncontrado = products[0].findIndex(p => p.code === deleteProduct)

    socket.emit('deleteProduct', productoEncontrado)
    formulario.reset()
}

document.getElementById('btnAdd').addEventListener('click', addProduct)
document.getElementById('btnEliminar').addEventListener('click', eliminarProducto)
const formulario = document.getElementById('form')