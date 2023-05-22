const { knex } = require("../database");

function isValidCPF(cpf) {
  cpf = cpf.replace(/[\s.-]*/igm, '');

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

function isValidCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Valida DVs
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != parseInt(digitos.charAt(0)))
    return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != parseInt(digitos.charAt(1)))
    return false;
  return true;
}

function isValidCPFOrCNPJ(doc) {
  if (!doc) return false
  if (doc.every(doc[0]))//!Array.from(doc).filter(e => e !== doc[0]).length
    return false
  if (doc.length() == 11)
    return isValidCPF(doc)
  if (doc.length() == 14)
    return isValidCNPJ(doc)
  return false
}

function isMotorista(tipo){
  return tipo.toUpperCase() == 'MOTORISTA';
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
  if(isMotorista(pessoa.tipo) && !pessoa.cnh)
    console.log(err);
    res.status(400).send('É necessário informar a cnh do motorista!');
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
  if(!isValidCPFOrCNPJ(pessoa.cpf_cnpj))
    res.status(500).send('O cpf ou cnpj é inválido!');
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