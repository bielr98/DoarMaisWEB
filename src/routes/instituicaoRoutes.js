const express = require('express');
const router = express.Router();

const instituicaoController = require('../controllers/instituicaoController');
const InstituicaoModel = require('../models/instituicaoModel');

router.get('/', instituicaoController.indexView);
router.get('/criar_conta', instituicaoController.criarContaView);
router.post('/cadastrar_usuario', instituicaoController.cadastrarUsuario);
router.post('/acessar', instituicaoController.loginUsuario);

router.get('/home', instituicaoController.homeView); // Atualizado para usar o controlador
router.get('/configuracao', instituicaoController.configuracaoView); // Atualizado para usar o controlador

router.post('/editar-usuario', instituicaoController.editarUsuario);
router.post('/confirmar_doacao', instituicaoController.confirmarDoacao); // Certifique-se de que esta rota está definida
router.get('/instituicao/:id', instituicaoController.detalhesInstituicaoView); // Nova rota para detalhes da instituição
router.get('/perfil-instituicao', instituicaoController.perfilInstituicao);
router.get('/configuracao-instituicao', instituicaoController.configuracaoInstituicaoView);
router.post('/editar-instituicao', instituicaoController.editarInstituicao);

router.post('/remover', (req, res) => {
    const necessidade = req.body;
    const email = req.session.instituicaoEmail;
    const string = JSON.stringify(necessidade);
    
    InstituicaoModel.findOne({where: {email}})
    .then((instituicao) => {
        let necessidades = instituicao.necessidades;

        const necessidadesArray = Array.isArray(necessidades) ? necessidades : necessidades.split(',');
        const necessidadesFiltradas = necessidadesArray.filter(item => item.trim() !== string);

        instituicao.necessidades = necessidadesFiltradas
        instituicao.save();
        res.redirect('/perfil-instituicao');
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(); // Destruir a sessão ao fazer logout
    res.redirect('/');
});

module.exports = router;