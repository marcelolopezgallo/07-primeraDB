import knexLib from 'knex'
import { options } from '../../options/SQLite3.js'

const knex = knexLib(options)

try {
    await knex.schema.dropTableIfExists('productos')
    await knex.schema.createTable('productos', table => {
        table.increments('id').primary()
        table.string('title', 50).notNullable()
        table.string('thumbnail', 200).notNullable()
        table.float('price')
    })
} catch (error) {
    console.log(error)
} finally {
    knex.destroy()
}