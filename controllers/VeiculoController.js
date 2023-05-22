const { knex } = require("../database");

exports.get = async (req, res, next) => {
  try {
    const result = await knex.select('*').from('veiculos');

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
        .from('veiculos')
        .where('id', id);

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao tentar buscar dados!");
  }
};

exports.post = async (req, res, next) => {
  let veiculo = req.body;
  try {
    const result = await
      knex('veiculos')
        .transacting(trx)
        .returning('id')
        .insert(veiculo)
        .then(trx.commit)
        .catch(trx.rollback);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar inserir novo veículo!');
  }
};

exports.put = async (req, res, next) => {
  let id = req.params.id;
  let veiculo = req.body;
  try {
    const result = await
      knex('veiculos')
        .transacting(trx)
        .returning('id')
        .where('id', id)
        .update(veiculo)
        .then(trx.commit)
        .catch(trx.rollback);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar editar veículo!');
  }
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  try {
    const result = await
      knex('veiculos')
        .where('id', id)
        .del();
    res.send('Veículo excluído com sucesso!')
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar deletar veículo!');
  }
};