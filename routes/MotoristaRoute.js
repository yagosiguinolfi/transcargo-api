const MotoristaController = require('../controllers/MotoristaController');
module.exports = (app) => {
  app.get('/motoristas', MotoristaController.get);
  // app.get('/motorista/:id', MotoristaController.getById);
  // app.post('/motorista', MotoristaController.post);
  // app.put('/motorista/:id', MotoristaController.put);
  // app.delete('/motorista/:id', MotoristaController.delete);
}