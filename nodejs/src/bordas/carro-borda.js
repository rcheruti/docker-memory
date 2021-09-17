const MsgErro = require('../entidades/msg-erro');
const Pessoa = require('../entidades/db/pessoa');
const Carro = require('../entidades/db/carro');

module.exports = (app) => {
  const base = '/carro';

  app.post(base+'', async (req, res) => {
    if( !req.body.nome ) return res.status(400).send(new MsgErro(0,"Campo 'nome' (string) obrigatório!"));
    if( !req.body.cor ) return res.status(400).send(new MsgErro(0,"Campo 'cor' (string) obrigatório!"));
    if( !req.body.ano ) return res.status(400).send(new MsgErro(0,"Campo 'ano' (int) obrigatório!"));
    const carro = await Carro.create({ 
      nome: req.body.nome,
      cor: req.body.cor,
      ano: req.body.ano,
      pessoa_id: req.body.dono || null
    });
    return res.status(200).json(carro);
  });

  app.get(base+'/todos', async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const lista = await Carro.findAll({ include: 'dono', offset: page*size, limit: size });
    return res.status(200).json(lista);
  });

  app.get(base+'', async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const id = parseInt(req.query.id) || 0;
    const nome = req.query.nome || '';
    const cor = req.query.cor || '';
    const ano = parseInt(req.query.ano) || 0;
    const where = {};
    if( id ) where.id = id;
    if( nome.trim() ) where.nome = { [Op.like]: `%${nome.trim()}%` };
    if( cor.trim() ) where.cor = { [Op.like]: `%${cor.trim()}%` };
    if( ano ) where.ano = ano;
    const lista = await Carro.findAll({ include: 'dono', offset: page*size, limit: size, where:where });
    return res.status(200).json(lista);
  });

};
