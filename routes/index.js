import express from 'express'
const { Router } = express

const router = new Router()

router.get('/', (req, res) => {
    res.render('index', { 
        title: "Ingrese Producto",
        title_mensajes: "Centro de Mensajes"
    })
})

export {
    router
}