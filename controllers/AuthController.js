const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: knex } = require('knex');

const login = async (req, res) => {
  const {email, senha} = req.body;
  try {
    const usuario = await
      knex
        .select('*')
        .from('usuarios')
        .where('email', email);

    if (!usuario) {
      res
        .status(401)
        .json({
          statusCode: 401,
          message: 'Usuário não encontrado!',
          data: {
            email: email
          }
        });
    }

    const passwordValidate = bcrypt.compareSync(password, usuario.password);

    if (!passwordValidate) {
      res
        .status(401)
        .json({
          statusCode: 401,
          message: 'Não autorizado!'
        });
    }

    const token = jwt.sign({ name: usuario.nome }, 'TESTE');

    res
      .status(200)
      .json({
        statusCode: 200,
        message: 'Login realizado com sucesso!',
        data: {
          token
        }
      })

    } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        statusCode: 500,
        message: err.message
      });
  }
};

const verifyToken = (req, res, next) => {
  
  const tokenHeader = req.headers['authorization'];
  const token = tokenHeader && tokenHeader.slipt(' ')[1];

  if(!token){
    res
    .status(401)
    .json({
      statusCode: 401,
      message: 'Não autorizado!'
    });
  }

  try {

    jwt.verify(token, 'TESTE');
    next();
    
  } catch (err) {
    console.error(err);
    res
      .status(err.statusCode)
      .json({
        statusCode: err.statusCode,
        message: 'Token inválido!'
      });
  }

};

module.exports = {
  login,
  verifyToken
}
