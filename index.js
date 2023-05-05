const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log('API rodando - localhost:8080');
});


require('./routes/index')(app);