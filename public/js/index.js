const socket = io.connect()

async function getProducts(data) {
    const products = await data

    const recursoRemoto = await fetch('templates/tabla-productos.ejs')

    const textoPlantilla = await recursoRemoto.text()

    const functionTemplate = ejs.compile(textoPlantilla)
    
    const html = functionTemplate({ products })

    document.getElementById('productos').innerHTML = html
}

socket.on('productos', getProducts)