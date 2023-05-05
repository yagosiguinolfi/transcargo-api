// const sql = require('mssql');

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

// async function connect() {
//     try {
//         await knex.connect();
//         console.log("Conexão com o banco estabelecida!");
//     }catch(err){
//         console.log("Erro ao estabelecer conexão com o banco de dados! ", err)
//     }
// }

module.exports = {
    knex
}