const socket = io.connect()

async function getProducts(data) {
    products = await data
    console.log(products)
    if (data.length > 0){
        console.log(await data)
    }
}

socket.on('productos', getProducts)