const connection = {
    user: 'admin',
    password: 'root*123',
    server: 'database-1.ct3iq6yz2nm3.us-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'transcargodb'
}

const knex = require('knex')({
    client: 'mysql2',
    connection
})

module.exports = {
    knex
}