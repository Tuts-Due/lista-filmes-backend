const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { autenticar } = require('../middlewares/auth');

const router = express.Router();

router.post('/registrar', UsuarioController.registrar);
router.post('/login', UsuarioController.login);
router.get('/perfil', autenticar, UsuarioController.perfil);

module.exports = router;
