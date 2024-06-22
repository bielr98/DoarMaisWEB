const UsuarioModel = require("../models/usuarioModel");
const InstituicaoModel = require("../models/instituicaoModel");
const { Where } = require("sequelize/lib/utils");

function indexView(req, res) {
  res.render("index.html");
}

function criarContaView(req, res) {
  res.render("usuario_cadastro.html");
}

function cadastrarUsuario(req, res) {
  const {
    nome,
    email,
    senha,
    tipo,
    descricao,
    categoria,
    necessidades,
    contato,
  } = req.body;

  UsuarioModel.create({
    nome,
    email,
    senha,
    tipo,
    dataCadastro: new Date(),
  })
    .then((usuario) => {
      if (tipo === "Instituicao") {
        InstituicaoModel.create({
          nome,
          email,
          senha,
          descricao,
          categoria,
          necessidades: necessidades.split(",").map((item) => item.trim()), // Processar necessidades como array
          contato,
        })
          .then(() => {
            res.redirect("/?cadastrar_usuario=true");
          })
          .catch((err) => {
            console.error(err);
            res.redirect("/?cadastrar_usuario=false");
          });
      } else {
        res.redirect("/?cadastrar_usuario=true");
      }
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/?cadastrar_usuario=false");
    });
}

function loginView(req, res) {
  res.render("index.html");
}

function loginUsuario(req, res) {
  const { email, senha } = req.body;
  UsuarioModel.findOne({ where: { email, senha } })
    .then((usuario) => {
      if (usuario) {
        const primeiroNome = usuario.nome.split(" ")[0];
        req.session.nome = primeiroNome;
        req.session.email = usuario.email; // Salva o nome na sessão
        InstituicaoModel.findAll()
          .then((instituicoes) => {
            res.render("home.html", { nome: primeiroNome, instituicoes });
          })
          .catch((err) => {
            console.error(err);
            res.redirect("/");
          });
      } else {
        res.redirect("/?login=false");
      }
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/?login=false");
    });
}

function homeView(req, res) {
  InstituicaoModel.findAll()
    .then((instituicoes) => {
      res.render("home.html", { nome: req.session.nome, instituicoes });
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/");
    });
}

function configuracaoView(req, res) { 
  res.render("configuracao.html", { nome: req.session.nome });
}

function confirmarDoacao(req, res) {
    const { instituicaoID, items } = req.body;

    console.log("Recebido para confirmação:", instituicaoID, items);

    if (!instituicaoID || !items || items.length === 0) {
        console.error("Dados inválidos recebidos:", req.body);
        return res.json({ success: false });
    }

    InstituicaoModel.findByPk(instituicaoID)
        .then((instituicao) => {
            if (!instituicao) {
                console.error("Instituição não encontrada");
                return res.json({ success: false });
            }

            const necessidades = instituicao.necessidades;
            const necessidadesArray = Array.isArray(necessidades) ? necessidades : necessidades.split(',');

            const necessidadesAtualizadas = necessidadesArray.filter(
                (necessidade) => !items.includes(necessidade)
            );

            instituicao.necessidades = necessidadesAtualizadas;
            return instituicao.save();
        })
        .then(() => {
            console.log("Necessidades atualizadas salvas no banco");
            res.json({ success: true });
        })
        .catch((err) => {
            console.error("Erro ao confirmar a doação:", err);
            res.json({ success: false });
        });
}


// Função para renderizar a página de detalhes da instituição
function detalhesInstituicaoView(req, res) {
    const instituicaoID = req.params.id;
    InstituicaoModel.findByPk(instituicaoID)
        .then((instituicao) => {
            if (!instituicao) {
                console.error("Instituição não encontrada");
                return res.redirect('/home');
            }
            res.render("instituicao_detalhes.html", { instituicao });
        })
        .catch((err) => {
            console.error("Erro ao buscar a instituição:", err);
            res.redirect('/home');
        });
}

function editarUsuario(req, res) {
  const email = req.session.email;
  const {nome, email: emailNovo, senha} = req.body;
  UsuarioModel.findOne({ where: {email}})
  .then((usuario) => {
    if (nome) {
      usuario.nome = nome
    }
    if (emailNovo) {
      usuario.email = emailNovo;
    }
    if (senha) {
      usuario.senha = senha;
    }
    usuario.save();
    InstituicaoModel.findAll().then((instituicoes) => {
      const primeiroNome = usuario.nome.split(" ")[0];
      res.render("home.html", {nome: primeiroNome, instituicoes});
    })
  })
}

module.exports = {
  indexView,
  criarContaView,
  cadastrarUsuario,
  loginView,
  loginUsuario,
  homeView,
  configuracaoView,
  confirmarDoacao,
  detalhesInstituicaoView,
  editarUsuario,
};
