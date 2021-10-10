import knexLib from 'knex'

class SqlClient {
    constructor(config){
        this.knex = knexLib(config)
    }

    create(productos) {
        return this.knex('productos').insert(productos)
    }

    getAll() {
        return this.knex('productos').select('*')
    }

    getById(id) {
        return this.knex.from('productos').where('id', id)
    }

    update(id, payload) {
        return this.knex('productos').where({id: id}).update(payload)
    }

    deleteById(id) {
        return this.knex('productos').where({id: id}).del()
    }
}

export {
    SqlClient
}