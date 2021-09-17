const Contenedor = require('../models/contenedor')
const express = require('express')
const { Router } = express


async function getProducts(req, res, next) {
    try {
        const products = await contenedor.getAll()
        res.render('products', {
            title: "Vista de Productos",
            products: products
        })
    } catch (error) {
        next(error)
    }
}

async function getProductsById(req, res, next) {
    try {
        const product = await contenedor.getById(req.params.id)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

async function createProduct(req, res, next) {
    try {
        const id = await contenedor.create(req.body)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

async function updateProduct(req, res, next) {
    try {
        await contenedor.update(parseInt(req.params.id), req.body)
        res.json(req.body)
    } catch (error) {
        next(error)
    }
}

async function deleteProduct(req, res, next) {
    try {
        await contenedor.deleteById(req.params.id)
        res.json(`id: ${req.params.id} deleted succesfully`)
    } catch (error) {
        next(error)
    }
}

function errorFunction(err, req, res, next) {
    switch (err.message) {
        case 'producto no encontrado':
            res.json({
                error: err.message
            })
            break;

        default:
            break;
    }
    next()
}

const contenedor = new Contenedor('./productos.txt')
const router = new Router()

router.get('/', getProducts)
router.get('/:id', getProductsById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.use(errorFunction)

module.exports = { router, contenedor}