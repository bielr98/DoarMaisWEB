// const { Sequelize } = require('sequelize');

// const db = new Sequelize('nome_do_banco', 'usuario', 'senha', {
//     host: 'localhost',
//     dialect: 'mysql',
// });

// module.exports = db;

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

module.exports = sequelize;