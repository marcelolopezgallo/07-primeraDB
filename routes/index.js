const express = require('express')
const { Router } = express

const router = new Router()

router.get('/', (req, res) => {
    res.render('index', { title: "Ingrese Producto" })
})

module.exports = router