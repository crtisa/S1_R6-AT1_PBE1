const { clienteModel } = require('../models/clienteModel');

const clienteController = {
    buscarTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodos();
            // console.log(resultado)
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json(resultado);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            // console.log(id)
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um identificador (ID) válido' });
            }
            const resultado = await clienteModel.buscarPorID(id)
            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    criacaoDeCliente: async (req, res) => {
        try {
            const { nome_cliente, cpf_cliente } = req.body;

            if (!nome_cliente || !cpf_cliente || nome_cliente.length < 3 || cpf_cliente.length != 11) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }

            const clienteExistente = await clienteModel.selecionarPorCPF(cpf_cliente);
            if (clienteExistente.length > 0) {
                return res.status(409).json({ message: 'O CPF informado já está cadastrado' });
            }
            await clienteModel.inserirCliente(nome_cliente, cpf_cliente);

            res.status(201).json({ message: 'Cliente criado com sucesso!' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    editarCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            const { nome_cliente, cpf_cliente } = req.body;
            if (!idCliente || !nome_cliente || !cpf_cliente || !Number.isInteger(idCliente)|| nome_cliente.length < 3 || cpf_cliente.length != 11) {
                return res.status(400).json({ message: 'Os dados enviados são inválidos' });
            }


            const clienteExistente = await clienteModel.buscarPorID(idCliente);
            if (clienteExistente.length === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            
            const cpfExistente = await clienteModel.selecionarPorCPF(cpf_cliente);
            if (cpfExistente.length > 0) {
                return res.status(409).json({ message: 'O CPF informado já está cadastrado' });
            }

            await clienteModel.editarCliente(idCliente, nome_cliente, cpf_cliente);
            res.status(200).json({ message: 'Cliente atualizado com sucesso' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    excluirCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um identificador (ID) válido' });
            }

            const clienteExistente = await clienteModel.buscarPorID(id);
            if (clienteExistente.length == 0) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            await clienteModel.excluirCliente(id);
            res.status(200).json({ message: 'Cliente deletado com sucesso!' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    }
};
module.exports = { clienteController };