import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';


//mongo
import objConfig from './config/configMongo.js'

import initializePassport from './config/passport.config.js';
import viewsRouter from './routes/views.routes.js'
import registroRouter from './routes/registro.routes.js'
import loginRouter from './routes/login.routes.js'
import productsRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import githubRoutes from './routes/github.routes.js'


const app = express();
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')
app.use(express.static('public'))

const server = app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
objConfig.connectDB()

app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: objConfig.url,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10000
    }),
    secret: 'codigo-s3cr3t0',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())



app.use('/api/home', viewsRouter)
app.use('/api/registro', registroRouter)
app.use('/api/login', loginRouter)
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/sessions', githubRoutes)