const pool = require('../config/database');

class FilmeSerie {
  static async criar(usuarioId, titulo, tipo, status) {
    const resultado = await pool.query(
      'INSERT INTO filmes_series (usuario_id, titulo, tipo, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuarioId, titulo, tipo, status]
    );
    return resultado.rows[0];
  }

  static async buscarPorId(id, usuarioId) {
    const resultado = await pool.query(
      'SELECT * FROM filmes_series WHERE id = $1 AND usuario_id = $2',
      [id, usuarioId]
    );
    return resultado.rows[0];
  }

  static async buscarTodosPorUsuario(usuarioId) {
    const resultado = await pool.query(
      'SELECT * FROM filmes_series WHERE usuario_id = $1 ORDER BY criado_em DESC',
      [usuarioId]
    );
    return resultado.rows;
  }

  static async atualizar(id, usuarioId, titulo, tipo, status, favorito) {
    const resultado = await pool.query(
      'UPDATE filmes_series SET titulo = $1, tipo = $2, status = $3, favorito = $4, atualizado_em = CURRENT_TIMESTAMP WHERE id = $5 AND usuario_id = $6 RETURNING *',
      [titulo, tipo, status, favorito, id, usuarioId]
    );
    return resultado.rows[0];
  }

  static async deletar(id, usuarioId) {
    const resultado = await pool.query(
      'DELETE FROM filmes_series WHERE id = $1 AND usuario_id = $2 RETURNING id',
      [id, usuarioId]
    );
    return resultado.rows[0];
  }

  static async toggleFavorito(id, usuarioId) {
    const resultado = await pool.query(
      'UPDATE filmes_series SET favorito = NOT favorito, atualizado_em = CURRENT_TIMESTAMP WHERE id = $1 AND usuario_id = $2 RETURNING *',
      [id, usuarioId]
    );
    return resultado.rows[0];
  }
}

module.exports = FilmeSerie;
