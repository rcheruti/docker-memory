import { DataTypes } from 'sequelize';
import { db } from '../../config/db';

import { Pessoa } from './pessoa';

export const Carro = db.define('Carro', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(255)
  },
  cor: {
    type: DataTypes.STRING(45)
  },
  ano: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  pessoa_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Pessoa,
      key: 'id',
    }
  }
}, {
  tableName: 'carro',
  timestamps: false,
});
// Carro.beforeAssociate = (models, others) => {
//   console.log('Carro.beforeAssociate', models, others);
// };
