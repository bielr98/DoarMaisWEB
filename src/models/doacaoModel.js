const Sequelize = require('sequelize');
const db = require('../db');

const DoacaoModel = db.define('doacao', {
    doacaoID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuarioID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', // Nome da tabela de usuários
            key: 'usuarioID'
        }
    },
    instituicaoID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'instituicoes', // Nome da tabela de instituições
            key: 'instituicaoID'
        }
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anonimo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
});

module.exports = DoacaoModel;