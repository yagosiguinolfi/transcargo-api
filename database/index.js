const connection = {
    user: 'SA',
    password: 'root*123456',
    server: 'localhost',
    port: 1433,
    database: 'transcargodb',
    options: {
        encrypt: false
    }
}

const knex = require('knex')({
    client: 'mssql',
    connection
})

module.exports = {
    knex
}