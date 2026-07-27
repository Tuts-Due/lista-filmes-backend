const FilmeSerie = require('../models/FilmeSerie');

class FilmeSerieController {
  static async criar(req, res) {
    try {
      const { titulo, tipo, status } = req.body;
      const usuarioId = req.usuarioId;

      if (!titulo || !tipo || !status) {
        return res.status(400).json({ erro: 'Título, tipo e status são obrigatórios' });
      }

      if (!['filme', 'serie'].includes(tipo)) {
        return res.status(400).json({ erro: 'Tipo deve ser "filme" ou "serie"' });
      }

      if (!['quero-assistir', 'assistindo', 'assistido'].includes(status)) {
        return res.status(400).json({ erro: 'Status inválido' });
      }

      const filmeSerie = await FilmeSerie.criar(usuarioId, titulo, tipo, status);
      res.status(201).json(filmeSerie);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  static async listar(req, res) {
    try {
      const usuarioId = req.usuarioId;
      const filmesSeries = await FilmeSerie.buscarTodosPorUsuario(usuarioId);
      res.json(filmesSeries);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  static async obter(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = req.usuarioId;

      const filmeSerie = await FilmeSerie.buscarPorId(id, usuarioId);
      if (!filmeSerie) {
        return res.status(404).json({ erro: 'Filme/série não encontrado' });
      }

      res.json(filmeSerie);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, tipo, status, favorito } = req.body;
      const usuarioId = req.usuarioId;

      const filmeSerie = await FilmeSerie.buscarPorId(id, usuarioId);
      if (!filmeSerie) {
        return res.status(404).json({ erro: 'Filme/série não encontrado' });
      }

      const atualizado = await FilmeSerie.atualizar(
        id,
        usuarioId,
        titulo || filmeSerie.titulo,
        tipo || filmeSerie.tipo,
        status || filmeSerie.status,
        favorito !== undefined ? favorito : filmeSerie.favorito
      );

      res.json(atualizado);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = req.usuarioId;

      const resultado = await FilmeSerie.deletar(id, usuarioId);
      if (!resultado) {
        return res.status(404).json({ erro: 'Filme/série não encontrado' });
      }

      res.json({ mensagem: 'Filme/série deletado com sucesso' });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  static async toggleFavorito(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = req.usuarioId;

      const filmeSerie = await FilmeSerie.toggleFavorito(id, usuarioId);
      if (!filmeSerie) {
        return res.status(404).json({ erro: 'Filme/série não encontrado' });
      }

      res.json(filmeSerie);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = FilmeSerieController;
