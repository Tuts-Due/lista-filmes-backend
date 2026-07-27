const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  static async criar(nome, email, senha) {
    const senhaHash = await bcrypt.hash(senha, 10);
    const resultado = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senhaHash]
    );
    return resultado.rows[0];
  }

  static async buscarPorEmail(email) {
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
    return resultado.rows[0];
  }

  static async buscarPorId(id) {
    const resultado = await pool.query(
      'SELECT id, nome, email FROM usuarios WHERE id = $1',
      [id]
    );
    return resultado.rows[0];
  }

  static async verificarSenha(senhaFornecida, senhaHash) {
    return await bcrypt.compare(senhaFornecida, senhaHash);
  }
}

module.exports = Usuario;
