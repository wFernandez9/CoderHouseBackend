const express = require('express');
const { engine } = require('express-handlebars');
//mongo
const { objConfig } = require('./config/config.js')

const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const viewsRoutes = require('./routes/views.routes');
const cookieRouter = require('./routes/cookie.router.js')
const sessionRouter = require('./routes/session.router.js')
const registroRouter = require('./routes/registro.routes.js')
const loginRouter = require('./routes/login.routes.js')

const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express();
const PORT = 8080

//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/public'))

console.log(__dirname);

const server = app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) })
objConfig.connectDB()


app.use(cookieParser('CoderS3cR3t@'));
app.use(session({
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

app.use('/api/home', viewsRoutes)
app.use('/api/registro', registroRouter)
app.use('/api/login', loginRouter)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/session', sessionRouter)
app.use('/cookie', cookieRouter);