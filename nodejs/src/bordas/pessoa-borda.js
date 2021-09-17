const MsgErro = require('../entidades/msg-erro');
const Pessoa = require('../entidades/db/pessoa');
const Carro = require('../entidades/db/carro');
const { Op } = require("sequelize");

module.exports = (app) => {
  const base = '/pessoa';

  app.post(base+'', async (req, res) => {
    if( !req.body.nome ) return res.status(400).send(new MsgErro(0,"Campo 'nome' (string) obrigatório!"));
    const pessoa = await Pessoa.create({ nome: req.body.nome });
    return res.status(200).json(pessoa);
  });

  app.get(base+'/todos', async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const lista = await Pessoa.findAll({ include: Carro, offset: page*size, limit: size });
    return res.status(200).json(lista);
  });

  app.get(base+'', async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const id = parseInt(req.query.id) || 0;
    const nome = req.query.nome || '';
    const where = {};
    if( id ) where.id = id;
    if( nome.trim() ) where.nome = { [Op.like]: `%${nome.trim()}%` };
    const lista = await Pessoa.findAll({ include: Carro, offset: page*size, limit: size, where:where });
    return res.status(200).json(lista);
  });

};
