const { knex } = require("../database");

exports.get = async (req, res, next) => {
  try {
    const result = await knex.select('*').from('usuarios');

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno");
  }
};

exports.getById = async (req, res, next) => {
  let id = req.params.id;
  try {
    const result = await
      knex
        .select('*')
        .from('usuarios')
        .where('id', id);

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao tentar buscar dados!");
  }
};

exports.post = async (req, res, next) => {
  let usuario = req.body;
  try {
    const result = await
      knex('usuarios')
        .transacting(trx)
        .returning('cod_usuario')
        .insert(usuario)
        .then(trx.commit)
        .catch(trx.rollback);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar inserir novo usuario!');
  }
};

exports.put = async (req, res, next) => {
  let id = req.params.id;
  let usuario = req.body;
  try {
    const result = await
      knex('usuarios')
        .transacting(trx)
        .returning('cod_usuario')
        .where('cod_usuario', id)
        .update(usuario)
        .then(trx.commit)
        .catch(trx.rollback);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar editar usuario!');
  }
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  try {
    const result = await
      knex('usuarios')
        .where('cod_usuario', id)
        .del();
    res.send('usuario excluído com sucesso!')
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar deletar usuario!');
  }
};

exports.authRoute = async (req, res, next) => {
  res
    .status(200)
    .json({
      statusCode: 200,
      message: 'Rota autenticada!'
    });
};