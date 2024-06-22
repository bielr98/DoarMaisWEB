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

function loginView(req, res) {
    res.render("index.html");
}

function loginUsuario(req, res) {
    const {email, senha } = req.body;
    UsuarioModel.findOne({ where: { email, senha } })
    .then(usuario => {
        if (usuario) {
            // Armazenar o primeiro nome na sessão
            req.session.nome = usuario.nome.split(' ')[0];
            res.redirect('/home'); 
        } else {
            res.redirect('/?login=false');
        }
    })
    .catch(err => {
        console.error(err);
        res.redirect('/?login=false');
    });
}

function homeView(req, res) {
    res.render('home.html', { nome: req.session.nome });
}

function configuracaoView(req, res) {
    res.render('configuracao.html', { nome: req.session.nome });
}

module.exports = {
    indexView,
    criarContaView,
    cadastrarUsuario,
    loginView,
    loginUsuario,
    homeView,
    configuracaoView
}