const { knex } = require("../database");

function isValidCPF(cpf) {
  cpf = cpf.replace(/[\s.-]*/igm, '');
  if (cpf !== null ||
    cpf.length !== 11 ||
    !Array.from(cpf).filter(e => e !== cpf[0]).length
  ) return false;

  let soma, resto = 0;

  for (i = 1; i <= 9; i++)
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11))
    resto = 0;
  if (resto != parseInt(strCPF.substring(9, 10)))
    return false;
  soma = 0;
  for (i = 1; i <= 10; i++)
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto == 10) || (resto == 11))
    resto = 0;
  if (resto != parseInt(strCPF.substring(10, 11)))
    return false;
  return true;
}

exports.get = async (req, res, next) => {
  try {
    const result = await knex.select('*').from('pessoas');

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
        .from('pessoas')
        .where('id', id);

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao tentar buscar dados!");
  }
};

exports.post = async (req, res, next) => {
  let pessoa = req.body;
  try {
    const result = await
      knex('pessoas')
        .transacting(trx)
        .returning('id')
        .insert(pessoa)
        .then(trx.commit)
        .catch(trx.rollback);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar inserir nova pessoa!');
  }
};

exports.put = async (req, res, next) => {
  let id = req.params.id;
  let pessoa = req.body;
  if(!isValidCPF(pessoa.cpf))
    res.status(500).send('O cpf é inválido!');
  try {
    const result = await
      knex('pessoas')
        .transacting(trx)
        .returning('id')
        .where('id', id)
        .update(pessoa)
        .then(trx.commit)
        .catch(trx.rollback);

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar editar pessoa!');
  }
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  try {
    const result = await
      knex('pessoas')
        .where('id', id)
        .del();
    res.send('Motorista excluído com sucesso!')
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao tentar deletar pessoa!');
  }
};