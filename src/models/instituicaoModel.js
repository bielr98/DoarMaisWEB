const Sequelize = require('sequelize');
const db = require('../db');

const InstituicaoModel = db.define('instituicao', {
    instituicaoID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    necessidades: {
        type: Sequelize.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('necessidades');
            return rawValue ? rawValue.split(',') : [];
        },
        set(value) {
            this.setDataValue('necessidades', value.join(','));
        }
    },
    contato: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'instituicoes',
    timestamps: true
});

module.exports = InstituicaoModel;