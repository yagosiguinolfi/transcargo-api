const express = require("express");
const cors = require('cors');
const { knex } = require("./database");

const api = express();

api.use(express.json());
api.use(cors());

api.listen(80, () => {
  console.log('API rodando - localhost:80');
});

api.get('/', async (req, res) => {
  try {
    const result = await knex.select('*').from('usuarios');

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno");
  }
})

require('./routes/index')(api);