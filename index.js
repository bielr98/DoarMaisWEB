const express = require("express");
const mustacheExpress = require("mustache-express");
// const db = require("./src/db");
const app = express();
const PORT = 8080;

// Configurar o motor de templates Mustache
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + "/src/views");

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

// Rotas
app.use('/', require('./src/routes/instituicaoRoutes'));

//conectar com DB
db.sync(function () {
    console.log('Banco de Dados conectado');
});

//Iniciar o Servidor
app.listen(PORT, function () {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

