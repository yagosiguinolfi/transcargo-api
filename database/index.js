const sql = require('mssql');

const config = {
    user: 'SA',
    password: 'root*123456',
    server: 'localhost',
    port: 1433,
    database: 'transcargodb',
    options: {
        encrypt: false
    }
}

async function connect() {
    try {
        await sql.connect(config);
        console.log("Conexão com o banco estabelecida!");
    }catch(err){
        console.log("Erro ao estabelecer conexão com o banco de dados! ", err)
    }
}

module.exports = {
    connect,
    sql
}