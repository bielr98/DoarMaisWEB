const express = require('express');
const router = express.Router();

const instituicaoController = require('../controllers/instituicaoController')

router.get('/', instituicaoController.indexView);
router.get('/criar_conta', instituicaoController.criarContaView);
router.post('/cadastrar_usuario', instituicaoController.cadastrarUsuario);
router.post('/acessar', instituicaoController.loginUsuario);

router.get('/home', (req, res) => {
    res.render('home.html');// Rota para servir a página home.html
})

router.get('/logout', (req, res) => {
    // Aqui você pode destruir a sessão se estiver usando sessões
    res.redirect('/');
});

module.exports = router;