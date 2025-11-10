const express =  require ('express');
const clienteRoutes = express.Router();

const {clienteController} = require('../controllers/clienteControler');

clienteRoutes.get('/clientes', clienteController.buscarTodosClientes);
clienteRoutes.get('/clientes/:idCliente', clienteController.buscarPorId);
clienteRoutes.post('/clientes', clienteController.criacaoDeCliente);
clienteRoutes.put('/clientes/:idCliente', clienteController.editarCliente);
clienteRoutes.delete('/clientes/:idCliente', clienteController.excluirCliente);


module.exports = { clienteRoutes };