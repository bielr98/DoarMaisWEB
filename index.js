const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require('express-session');
const db = require("./src/db");
const UsuarioModel = require("./src/models/usuarioModel");
const InstituicaoModel = require("./src/models/instituicaoModel");
const DoacaoModel = require("./src/models/doacaoModel");

const app = express();
const PORT = 8080;

// Configurar o motor de templates Mustache
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + "/src/views");

// Middleware para servir arquivos estáticos
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// Configurar sessões
app.use(session({
    secret: 'seu_segredo', // Troque isso por um segredo seguro
    resave: false,
    saveUninitialized: true
}));

// Rotas
app.use('/', require('./src/routes/instituicaoRoutes'));

//conectar com DB
db.sync(function () {
    console.log('Banco de Dados conectado');
});

// / Sincronizar o banco de dados e iniciar o servidor
db.sync().then(() => {
    console.log('Banco de Dados conectado');
    app.listen(PORT, function () {
        console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados:', err);
});
