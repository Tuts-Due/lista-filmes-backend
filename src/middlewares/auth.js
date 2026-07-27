const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decodificado.usuarioId;
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

module.exports = { autenticar };
