import { log } from './logger';
log.info('Criando associações entre entidades');

import { Pessoa } from '../entidades/db/pessoa';
import { Carro } from '../entidades/db/carro';

Pessoa.hasMany(Carro, {
  foreignKey: 'pessoa_id'
});
Carro.belongsTo(Pessoa, {
  as: 'dono',
  foreignKey: 'pessoa_id'
});
