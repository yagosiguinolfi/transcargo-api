const AuthRoute = require('./AuthRoute');
const PessoaRoute = require('./PessoaRoute');
module.exports = (app) => {
   PessoaRoute(app),
   AuthRoute(app)
}