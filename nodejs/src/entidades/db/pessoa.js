const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Pessoa = db.define('Pessoa', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'pessoa',
  timestamps: false
});

module.exports = Pessoa;