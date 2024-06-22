const UsuarioModel = require('../models/usuarioModel');
const InstituicaoModel = require('../models/instituicaoModel');

function indexView(req, res) {
    res.render('index.html');
}

function criarContaView(req, res) {
    res.render('usuario_cadastro.html');
}

function cadastrarUsuario(req, res) {
    const { nome, email, senha, tipo, endereco, descricao, categoria, contato, dataFundacao } = req.body;
    
    UsuarioModel.create({
        nome,
        email,
        senha,
        tipo,
        dataCadastro: new Date()
    }).then(usuario => {
        if (tipo === 'Instituicao') {
            InstituicaoModel.create({
                usuarioID: usuario.usuarioID,
                nome,
                endereco,
                descricao,
                categoria,
                contato,
                dataFundacao
            }).then(() => {
                res.redirect('/?cadastrar_usuario=true');
            }).catch(err => {
                console.error(err);
                res.redirect('/?cadastrar_usuario=false');
            });
        } else {
            res.redirect('/?cadastrar_usuario=true');
        }
    }).catch(err => {
        console.error(err);
        res.redirect('/?cadastrar_usuario=false');
    });
}

module.exports = {
    indexView,
    criarContaView,
    cadastrarUsuario
}