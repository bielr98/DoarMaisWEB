const express = require('express');
const router = express.Router();

const instituicaoController = require('../controllers/instituicaoController')

router.get('/', instituicaoController.indexView);
router.get('/criar_conta', instituicaoController.criarContaView);
router.post('/cadastrar_usuario', instituicaoController.cadastrarUsuario);

module.exports = router;