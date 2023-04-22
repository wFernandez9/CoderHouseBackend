let containerCards = document.getElementById('containerCards')
let containerCart = document.getElementById('containerCart')
let btnAnterior = document.getElementById('btnAnterior')
let btnSiguiente = document.getElementById('btnSiguiente')
let linkCarrito = document.getElementById('linkCarrito')
let tituloCarrito = document.getElementById('tituloCarrito')
let pag = document.getElementById('pag')
let pagina = 1
let limite
// pag.innerHTML = pagina


const paginaProductos = () => {

    const getProduct = async (limit = 2, page = 1) => {
        const product = await fetch(`http://localhost:8080/api/products/?limit=${limit}&page=${page}`)
        const result = await product.json()
        return result
    }



    const renderProducts = async () => {
        const products = await getProduct()

        if (!products.products.hasPrevPage) {
            btnAnterior.disabled = true
        }
        if (products.products.hasNextPage) {
            btnSiguiente.disabled = false
        }
        if (!products.products.hasNextPage) {
            btnSiguiente.disabled = true
        }
        if (products.products.hasPrevPage) {
            btnAnterior.disabled = false
        }

        render(products)
    }

    renderProducts()


    const render = (products) => {
        containerCards.innerHTML = ''
        products.products.docs.map(prod => {
            const item = document.createElement('div')
            item.classList.add('item')
            item.innerHTML =
                `<div class="card" style="width: 15rem; margin: 5px">
        <div class="card-body">
        <h5 class="card-title">${prod.title}</h5>
        <p class="card-text"> ${prod.description}</p>
        <p class="card-text">PRECIO: $${prod.price}</p>
        <p class="card-text">CATEGORIA: ${prod.category}</p>
        <p class="card-text">Codigo: ${prod.code}</p>
        </div>
        <button id=${prod._id}>Agregar al Carrito</button>
        </div>`
            containerCards.appendChild(item)
            const btnAgregar = document.getElementById(prod._id)
            btnAgregar.addEventListener('click', () => addCart(prod._id))
        }
        )
    }





    const siguiente = async () => {
        pagina++
        pag.innerHTML = pagina
        const products = await getProduct(2, pagina)

        if (!products.products.hasNextPage) {
            btnSiguiente.disabled = true
        }
        if (products.products.hasPrevPage) {
            btnAnterior.disabled = false
        }

        render(products)
    }
    const anterior = async () => {
        pagina--
        pag.innerHTML = pagina
        const products = await getProduct(2, pagina)

        if (!products.products.hasPrevPage) {
            btnAnterior.disabled = true
        }
        if (products.products.hasNextPage) {
            btnSiguiente.disabled = false
        }

        render(products)
    }


    btnSiguiente.addEventListener('click', siguiente)
    btnAnterior.addEventListener('click', anterior)

}
if (window.location.href == 'http://localhost:8080/api/viewproducts') {

    paginaProductos()
}
//-----------------------------------------------------------------------------------------
const getCart = async () => {
    const cart = await fetch('http://localhost:8080/api/carts')
    const data = cart.json()
    return data
}


const addCart = async (pid) => {
    const carrito = await getCart()
    const cartId = carrito[0]._id

    try {
        const addCartProduct = await fetch(`http://localhost:8080/api/carts/${cartId}/products/${pid}`, {
            method: 'PUT'
        })
        alert('Producto agregado al carrito')
    } catch (err) {
        console.log(err)
    }

}

const renderCart = async () => {

    const productos = await getCart()

    const list = productos[0].products.map((prod) => {
        return `<div class="card" style="width: 15rem; margin: 5px">
                    <div class="card-body">
                        <h5 class="card-title">${prod.product.title}</h5>
                        <p class="card-text"> ${prod.product.description}</p>
                        <p class="card-text">PRECIO: $${prod.product.price}</p>
                        <p class="card-text">CATEGORIA: ${prod.product.category}</p>
                        <p class="card-text">Codigo: ${prod.product.code}</p>
                     </div>
                 </div>`
    })
        .join(' ')
    containerCart.innerHTML = list

}
if (window.location.href == 'http://localhost:8080/api/viewproducts/cart') {

    renderCart()
}
