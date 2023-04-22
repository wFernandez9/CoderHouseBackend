const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
//mongo
const { objConfig } = require('./config/config.js')

const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const viewsRoutes = require('./routes/views.routes');

const app = express();
const PORT = 8080


app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
//app.set('views', './src/views');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/public'))

console.log(__dirname);

const server = app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) })
objConfig.connectDB()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/viewproducts', viewsRoutes)