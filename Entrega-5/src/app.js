const express = require("express");
/* const __dirname = require('./utils.js'); */
const { engine } = require("express-handlebars");
const viewsRouter = require('./routes/views.routes.js');
const { Server } = require("socket.io");

const app = express();
const PORT = 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/public'))

console.log(__dirname);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor en http:localhost:${PORT}`);
    console.log('Iniciado con socket.io')
});

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('newProduct', (data) => {
        console.log(data);
        socketServer.emit('producto-nuevo', data);
    })

    socket.on('deleteProduct', (data) => {
        console.log(data)
        socketServer.emit('productoABorrar', data)
    })
});