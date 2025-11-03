const pool = require('../config/db');

const produtoModel = {
/**
 * Selecione todos os produtos cadastrados na tabela
 * @async
 * @function selecionarTodos
 * @returns Retorna o resultado com um array de objetos, cada objeto representa um registro da tabela
 * 
 * @example
 * cosnt produtos =  await produtoModel.selecionarTodos();
 * console.log(produtos);
 * //Saída esperada
 * [
 *      {is_produtos: 1, descricao: 'Teclado', valor: 150.00},
 *      {id_produtos: 2, descricao: 'Mouse', valor: 399.00}
 * ]
 * 
 */
    // selecionar todos os produtos
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Seleciona um produto de acordo com o id_produto especificado
     * @async
     * @param {number} pId Idenificador que deve ser pesquisado no o banco de dados 
     * @returns {Promise<Array<Object>>}
     * 
     * @example
     * const produto = await produto.selecionarPorId(1);
     * console.log(produto)
     * //Saída esperada
     * [
     *     {id_produto: 1, descricao: 'Teclado',  valor: 150.00}
     * ]
     * 
     */
     selecionarPorId: async (pId) => {
        const sql = 'SELECT * FROM produtos WHERE id_produto=?;';
        const values = [pId]
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * inclui um item novo no banco de dados
     * @param {string} pDescricao 
     * @param {number} pValor 
     * @returns {Promise<object>} Retorna um objeto contendo prorpiedades que representam as informaçãoes do comando executado
     * @example
     * const produtos = await produtoModel.inserirProduto('Produto teste', 16.99);
     * //Saída 
     * "result": {
     * "message": " Regisgtro incluído com sucesso",
	  "result": {
		"fieldCount": 0,
		"affectedRows": 1,
		"insertId": 1,
		"info": "",
		"serverStatus": 2,
		"warningStatus": 0,
		"changedRows": 0
        } 
     */
     inserirProduto: async (pDescricao, pValor) => {
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?,?)';
        const values = [pDescricao, pValor];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    /**
     * inclui um item novo no banco de dados
     * @param {number} pId 
     * @param {String} pDecricao 
     * @param {number} pValor
     * @returns {Promise<object>} Retorna um objeto contendo prorpiedades que representam as informaçãoes do comando executado
     * @example
     * const produtos = await produtoModel.inserirProduto(1, 'Produto teste', 16.99);
     * //Saída 
     * "result": {
     * "message": " Regisgtro incluído com sucesso",
	  "result": {
		"fieldCount": 0,
		"affectedRows": 1,
		"insertId": 0,
		"info": "",
		"serverStatus": 2,
		"warningStatus": 0,
		"changedRows": 1
        } 
     */
    alterarProduto: async (pId, pDescricao, pValor) => {
        const sql = `UPDATE produtos SET descricao=?, valor=? WHERE id_produto=?;`;
        const values = [pDescricao, pValor, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    
    deleteProduto: async (pId) => {
        const sql = "DELETE FROM produtos WERE id_produto = ?;";
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
   
};

module.exports = { produtoModel };