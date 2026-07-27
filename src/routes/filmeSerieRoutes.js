const express = require('express');
const FilmeSerieController = require('../controllers/FilmeSerieController');
const { autenticar } = require('../middlewares/auth');

const router = express.Router();

router.use(autenticar);

router.post('/', FilmeSerieController.criar);
router.get('/', FilmeSerieController.listar);
router.get('/:id', FilmeSerieController.obter);
router.put('/:id', FilmeSerieController.atualizar);
router.delete('/:id', FilmeSerieController.deletar);
router.patch('/:id/favorito', FilmeSerieController.toggleFavorito);

module.exports = router;
