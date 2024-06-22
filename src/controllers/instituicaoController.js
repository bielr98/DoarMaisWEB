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
            //consulta o banco e pega o primeiro Nome
            const primeiroNome = usuario.nome.split(' ')[0];
            //pagina que ele sera redirecionado ao logar e passar o primeiro nome dele
            res.render('home.html', { nome: primeiroNome }); 
        } else {
            res.redirect('/?login=false');
        }
    })
    .catch(err => {
        console.error(err);
        res.redirect('/?login=false');
    });
}

module.exports = {
    indexView,
    criarContaView,
    cadastrarUsuario,
    loginView,
    loginUsuario
}