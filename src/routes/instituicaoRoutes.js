const express = require('express');
const router = express.Router();

const instituicaoController = require('../controllers/instituicaoController');

router.get('/', instituicaoController.indexView);
router.get('/criar_conta', instituicaoController.criarContaView);
router.post('/cadastrar_usuario', instituicaoController.cadastrarUsuario);
router.post('/acessar', instituicaoController.loginUsuario);

router.get('/home', instituicaoController.homeView); // Atualizado para usar o controlador
router.get('/configuracao', instituicaoController.configuracaoView); // Atualizado para usar o controlador

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
        }
        res.redirect('/');
    });
});

module.exports = router;