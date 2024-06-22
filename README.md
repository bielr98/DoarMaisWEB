# DoarMais Web

Doar Mais Web é um aplicativo projetado para facilitar a interação entre instituições de caridade e doadores. O aplicativo ajuda os usuários a descobrir instituições, entender suas necessidades e contribuir de forma efetiva. A integração de uma interface web visa ampliar o alcance da plataforma, tornando-a acessível a qualquer pessoa com acesso a um navegador, e não apenas a usuários de dispositivos Apple.

## Descrição do Projeto

Este projeto foi desenvolvido dentro do Apple Developer Academy da Universidade de Brasília e está atualmente disponível na App Store para iPhone. A versão web do aplicativo tem como objetivo conectar instituições de caridade e doadores, especialmente em regiões onde dispositivos Apple podem ser menos comuns devido ao custo elevado.

### Funcionalidades Principais

- **Cadastro de Usuários Doadores:** Usuários podem se registrar como doadores.
- **Cadastro de Instituições:** Instituições podem se registrar e fornecer informações sobre suas necessidades de doações.
- **Listagem de Instituições:** Exibir uma lista de instituições cadastradas e suas necessidades de doações.

## Instruções para Instalação

### Pré-requisitos

- Node.js (https://nodejs.org/)
- NPM (https://www.npmjs.com/)
- SQLite3 (https://www.sqlite.org/index.html)

### Passos para Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/DoarMaisWeb.git
   cd DoarMaisWeb
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Certifique-se de que o SQLite3 está instalado. Você pode verificar a instalação do SQLite3 com o comando:
   ```bash
   sqlite3 --version
   ```

4. Inicie o servidor:
   ```bash
   node index.js
   ```

5. Acesse o aplicativo no seu navegador:
   ```bash
   http://localhost:8080
   ```

## Estrutura do Projeto

```plaintext
DoarMaisWEB/
|-- node_modules/
|-- src/
|   |-- controllers/
|   |   |-- instituicaoController.js
|   |-- models/
|   |   |-- doacaoModel.js
|   |   |-- instituicaoModel.js
|   |   |-- usuarioModel.js
|   |-- routes/
|   |   |-- instituicaoRoutes.js
|   |-- views/
|       |-- home.html
|       |-- index.html
|       |-- template.html
|       |-- usuario_cadastro.html
|-- public/
|   |-- styles.css
|   |-- confianca.png
|   |-- icon.svg
|   |-- variedade.png
|-- db.js
|-- .gitattributes
|-- database.sqlite
|-- index.js
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- README.md
|-- Trabalho1_Programação Web.pdf
|-- Web_MER_DoarMais.pdf
```

## Objetivo da Aplicação Web

O Doar+ é projetado para facilitar a interação entre instituições de caridade e doadores. O aplicativo ajuda os usuários a descobrir instituições, entender suas necessidades e contribuir de forma efetiva. A interface web visa ampliar o alcance da plataforma, tornando-a acessível a qualquer pessoa com acesso a um navegador.

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js com Express, Mustache Express
- **Banco de Dados:** SQLite

## Considerações de Segurança e Privacidade

Adotamos medidas rigorosas para proteção de dados, incluindo autenticação robusta, criptografia de dados sensíveis e conformidade com normas de privacidade como a LGPD.

## Acessibilidade

Implementamos recursos para garantir a acessibilidade a usuários com diferentes capacidades, como suporte a leitores de tela e navegação simplificada.

## Licença

Este projeto está licenciado sob os termos da licença MIT.
