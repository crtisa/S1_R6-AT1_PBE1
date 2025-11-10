const pool = require ('../config/db');

const clienteModel = {

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },
    buscarPorID: async (pID) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente=?;';
        const values = [pID]
        const [rows] = await pool.query(sql, values);
        return rows;
    },

     selecionarPorCPF: async (pCPF) => {
        const sql = 'SELECT * FROM clientes WHERE cpf_cliente=?;';
        const values = [pCPF]
        const [rows] = await pool.query(sql, values);
        return rows;
    },

     inserirCliente: async (pNome, pCPF) => {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?)';
        const values = [pNome, pCPF];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
     
    editarCliente: async (pID, pNome, pCPF) => {
        const sql = 'UPDATE clientes SET nome_cliente=?, cpf_cliente=? WHERE id_cliente=?;';
        const values = [pNome, pCPF, pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    excluirCliente: async (pID) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente=?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    }

};
module.exports = { clienteModel };