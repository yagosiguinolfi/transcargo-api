const { knex } = require("../database");


exports.get = async (req, res, next) => {
  try {
    const result = await knex.select('*').from('MOTORISTAS');

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
        .from('motoristas')
        .where('cod_motorista', id);

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao tentar buscar dados!");
  }
};

exports.post = async (req, res, next) => {
  let motorista = req.body;
  try {
    const result = await
      knex('motoristas')
        .returning('cod_motorista')
        .insert(motorista);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar inserir novo motorista!');
  }
};

exports.put = async (req, res, next) => {
  let id = req.params.id;
  let motorista = req.body;
  try {
    const result = await
      knex('motoristas')
        .returning('cod_motorista')
        .where('cod_motorista', id)
        .update(motorista)
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar editar motorista!');
  }
}