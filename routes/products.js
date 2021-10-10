import { SqlClient } from '../models/sql.js'
import { options } from '../options/SQLite3.js'
import express from 'express'


async function getProducts(req, res, next) {
    try {
        const products = await sql.getAll()
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
        const product = await sql.getById(req.params.id)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

async function createProduct(req, res, next) {
    try {
        const id = await sql.create(req.body)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

async function updateProduct(req, res, next) {
    try {
        await sql.update(parseInt(req.params.id), req.body)
        res.json(req.body)
    } catch (error) {
        next(error)
    }
}

async function deleteProduct(req, res, next) {
    try {
        await sql.deleteById(req.params.id)
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

const sql = new SqlClient(options)
const { Router } = express
const router = new Router()

router.get('/', getProducts)
router.get('/:id', getProductsById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.use(errorFunction)

export {
    router
}