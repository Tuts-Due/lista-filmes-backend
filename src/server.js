const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');
const filmeSerieRoutes = require('./routes/filmeSerieRoutes');

const app = express();

const origensPermitidas = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: origensPermitidas,
  credentials: true
}));
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/filmes-series', filmeSerieRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', mensagem: 'Backend funcionando' });
});

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
