const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const Contenedor = require('./models/contenedor')
const contenedor = new Contenedor('./productos.txt')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const indexRouter = require('./routes/index')
const { router: productsRouter } = require('./routes/products')

app.set('views', './public/views');
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/products', productsRouter)

io.on('connection', socket => {
    console.log("Nuevo cliente")
    
    socket.emit('productos', contenedor.getAll())
})

const PORT = process.env.PORT || 3000

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))