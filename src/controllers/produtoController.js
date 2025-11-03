const {produtoModel} = require ('../models/produtoModel');

const produtoController = {
    /**
     * Retorna todos os produtos cadastrados no banco de dados 
     * Rota: GET / produtos 
     * @asyn
     * @function buscarTodosProdutos
     * @param {Request} req Objeto da requisição HTTP 
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<array>object>>} Conteúdo com os dados da requisição
     */
    buscarTodosProdutos: async (req, res) => {
        try {
            const resultado = await produtoModel.selecionarTodos();
            if (resultado.length === 0) {
                return res.status(200).json({message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json({message: 'Resultado dos dados listados', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    /**
     * Retorna o produto referente ao id_produto pesquisado
     * Rota: GET / produtos /:idProduto
     * @async
     * @function buscarTodosPorId
     * @param {Request} req Objeto da requisição HTTP 
     * @param {Response} res Objeto da resposta HTTP
     * @returns {Promise<Array<Object>>} Retorna objeto contendo os dados do produto pesquisado
     */

    buscarTodosPorId: async (req, res) => {
        try {
            const id = Number (req.params.idProdutos);
            if(!id || !Number.isInteger(id)) {
                return res.status(400).json({message: 'Forneça um identificador (ID) válido'});
            }
            const resultado = await produtoModel.selecionarPorId(id);
            res,status(200).json({mesage: 'Resultado dos dados listados', errorMessage: error.message });
        } catch (error) {
             console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    /**
     * Cria um novo bando de dados 
     * @async
     * @param {Request} req Objeto da requisição HTTP
     * @param {Response} res Objeto da resposta HTTP
     * @function incluirProduto
     * @returns {Promise<Objeto>} Retorna objeto contendo informações sobre o resultado do insert
     */

    incluirProduto: async (req, res) => {
        try {
            const { descricao, valor } = req.body;

            if (!String(descricao) || descricao.length < 3 || valor <= 0) {
                return res.status(400).json({message: 'Dados inválidos '});
            }
            const resultado = await produtoModel.inserirProduto(descricao, valor);

            if (resultado.affectedRows ===1 && resultado.insertId != 0) {
                res.status(201).json({ message: ' Regisgtro incluído com sucesso', result: resultado })
            } else {
                throw new Error (' Ocorreu um erro ao incluír o registro');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    atualizarProduto: async (req, res) => {
        try {
            const idProduto = Number(req.params.idProduto);
            let {descricao, valor} = req.body;
            descricao = descricao.trim();

            if(!idProduto || !descricao || !valor || typeof idProduto !== 'number' || !isNaN(descricao) || isNaN(valor) || descricao.trim().length < 3) {
                return res.status(400).json({mesage: 'Verifique os dados enviados novamente'});
            }
            
            const produtoAtual = await produtoModel.selecionarPorId(idProduto);
            const novaDescricao = descricao ?? produtoAtual[0].descricao;
            const novoValor = valor ?? produtoAtual[0].valor;

            const resultado = await produtoModel.alterarProduto(idProduto, novaDescricao, novoValor);

            if(resultado.changedRows === 0){
                throw new Error('Registro não localizado');
            }

            res.status(200).json({ mesage: 'Registro atualizado com sucesso', data: resultado});
        } catch (error) {
             console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
        
    },

    excluirProduto: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);
            if(!id || !Number.isInteger(id)){
                return res.status(400).json({message: 'Forneça um ID válido'});
            }

            const produtoSelecionado = await produtoModel.selecionarPorId(id);
            console.log(produtoSelecionado);

            if(produtoSelecionado.length === 0){
                throw new Error('Registro não localizado');
            }else {
                const resultado = await produtoController.deleteProduto(id);
                if(affectedRows === 1){
                    res.status(200).json({message: 'Produto excluído com sucesso', data: resultado});
                }else {
                    throw new Error('Não foi possível excluir o produto');
                }
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    

};

module.exports = { produtoController };