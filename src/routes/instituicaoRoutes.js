const express = require('express');
const router = express.Router();

const instituicaoController = require('../controllers/instituicaoController')

router.get('/', instituicaoController.indexview);
router.get('/criar_conta', instituicaoController.criarContaView);
router.post('/cadastrar_usuário', instituicaoController.cadastrarUsuario);

module.exports = router;