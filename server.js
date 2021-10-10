import express from 'express'
import { createServer as HttpServer} from "http";
import { Server as IOServer} from "socket.io";

// const Mensajes = require('./models/contenedor')
// const mensajes = new Mensajes(__dirname + '/mensajes.txt')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

import {router as indexRouter} from './routes/index.js'
import { router as productsRouter } from './routes/products.js'

app.set('views', './public/views');
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/products', productsRouter)

// io.on('connection', socket => {
//     console.log("Nuevo cliente")

//     contenedor.getAll().then( products =>{
//         socket.emit('productos', products)
//     })

//     mensajes.getAll().then( mensajes => {
//         socket.emit('mensajes', mensajes)
//     })

//     socket.on("newProduct", productData => {
//         contenedor.create(productData)
//         .then(() => {
//             return contenedor.getAll()
//         })
//         .then(products => {
//             io.sockets.emit('productos', products)
//         })
//     })

//     socket.on("newMessage", messageData => {
//         mensajes.create(messageData)
//         .then(() => {
//             return mensajes.getAll()
//         })
//         .then(mensajes => {
//             io.sockets.emit('mensajes', mensajes)
//         })
//     })
// })

const PORT = process.env.PORT || 3000

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))