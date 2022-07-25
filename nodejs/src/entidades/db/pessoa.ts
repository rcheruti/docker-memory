import { DataTypes } from 'sequelize';
import { db } from '../../config/db';

export const Pessoa = db.define('Pessoa', {
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
