const socket = io.connect()

async function getProducts(data) {
    const products = data

    const recursoRemoto = await fetch('templates/tabla-productos.ejs')

    const textoPlantilla = await recursoRemoto.text()

    const functionTemplate = ejs.compile(textoPlantilla)
    
    const html = functionTemplate({ products })

    document.getElementById('productos').innerHTML = html
}

function addProduct(e){
    const product = {
        title: String(document.getElementById('title').value),
        price: document.getElementById('price').value,
        thumbnail: String(document.getElementById('thumbnail').value)
    }
    socket.emit('newProduct', product)
}

function newMessage(e){
    const message = {
        email: document.getElementById('email').value,
        time: moment(),
        text: document.getElementById('mensaje').value
    }
    socket.emit("newMessage", message)
}

function getMessages(msjs) {
    const mensajesHTML = msjs
        .map(msj => `${msj.email} ${moment(msj.time).format("DD/MM/YYYY HH:MM:SS")} -> Mensaje: ${msj.text}`)
        .join('<br>')
    document.getElementById('mensajes').innerHTML = mensajesHTML
}

socket.on('productos', getProducts)
socket.on('mensajes', getMessages)