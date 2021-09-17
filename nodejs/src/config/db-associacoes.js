const log = require('./logger');
log.info('Criando associações entre entidades');

const Pessoa = require('../entidades/db/pessoa');
const Carro = require('../entidades/db/carro');

Pessoa.hasMany(Carro, {
  foreignKey: 'pessoa_id'
});
Carro.belongsTo(Pessoa, {
  as: 'dono',
  foreignKey: 'pessoa_id'
});
