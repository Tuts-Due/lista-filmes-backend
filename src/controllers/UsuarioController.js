const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class UsuarioController {
  static async registrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
      }

      const usuarioExistente = await Usuario.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Email já cadastrado' });
      }

      const usuario = await Usuario.criar(nome, email, senha);
      const token = jwt.sign({ usuarioId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({ usuario, token });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
      }

      const usuario = await Usuario.buscarPorEmail(email);
      if (!usuario) {
        return res.status(401).json({ erro: 'Email ou senha incorretos' });
      }

      const senhaValida = await Usuario.verificarSenha(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Email ou senha incorretos' });
      }

      const token = jwt.sign({ usuarioId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.json({
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
        token
      });
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  static async perfil(req, res) {
    try {
      const usuario = await Usuario.buscarPorId(req.usuarioId);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = UsuarioController;
