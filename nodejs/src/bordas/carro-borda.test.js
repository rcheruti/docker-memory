
jest.mock('../entidades/db/carro');

const bordas = require('./carro-borda');
const Carro = require('../entidades/db/carro');
const { Op } = require('sequelize');

// --------------------------------------------

function mockRes() {
  return {
    status: jest.fn().mockReturnValue({
      send: jest.fn().mockReturnValue( null ),
      json: jest.fn().mockReturnValue( null ),
    }),
  };
}

// --------------------------------------------

test('Testar "init"', () => {
  let mocked = {
    post: jest.fn(),
    get: jest.fn(),
  };
  bordas(mocked);
});

test('Testar "carro_borda_save"', async () => {
  let mockedReq = {
    body: {
      nome: null,
      cor: null,
      ano: null,
      dono: null,
    }
  };
  let mockedRes = mockRes();
  
  await bordas.carro_borda_save( mockedReq, mockedRes );
  expect( mockedRes.status.mock.calls[mockedRes.status.mock.calls.length -1][0] ).toBe( 400 );
  
  mockedReq.body.nome = "Algum nome";
  await bordas.carro_borda_save( mockedReq, mockedRes );
  expect( mockedRes.status.mock.calls[mockedRes.status.mock.calls.length -1][0] ).toBe( 400 );
  
  mockedReq.body.cor = "vermelho";
  await bordas.carro_borda_save( mockedReq, mockedRes );
  expect( mockedRes.status.mock.calls[mockedRes.status.mock.calls.length -1][0] ).toBe( 400 );
  
  mockedReq.body.ano = 2020;
  Carro.create.mockResolvedValue({ id: 1, ...mockedReq.body });
  await bordas.carro_borda_save( mockedReq, mockedRes );
  expect( mockedRes.status.mock.calls[mockedRes.status.mock.calls.length -1][0] ).toBe( 200 );
});

test('Testar "carro_borda_get_todos"', async () => {
  let mockedReq = {
    query: {
      page: 2,
      size: 15,
    }
  };
  let mockedRes = mockRes();

  Carro.findAll.mockResolvedValue([{ id: 1 }]);
  await bordas.carro_borda_get_todos( mockedReq, mockedRes );
  let Carro_findAll_res = Carro.findAll.mock.calls[Carro.findAll.mock.calls.length -1][0];
  expect( Carro_findAll_res.include ).toBe('dono');
  expect( Carro_findAll_res.offset ).toBe(30);
  expect( Carro_findAll_res.limit ).toBe(15);
});

test('Testar "carro_borda_get_um"', async () => {
  let mockedReq = {
    query: {
      page: 2,
      size: 15,
      id: null,
      nome: null,
      cor: null,
      ano: null,
    }
  };
  let mockedRes = mockRes();

  Carro.findAll.mockResolvedValue({ id: 1 });
  await bordas.carro_borda_get_um( mockedReq, mockedRes );
  let Carro_findAll_res = Carro.findAll.mock.calls[Carro.findAll.mock.calls.length -1][0];
  expect( Carro_findAll_res.include ).toBe('dono');
  expect( Carro_findAll_res.offset ).toBe(30);
  expect( Carro_findAll_res.limit ).toBe(15);
  
  mockedReq.query.id = 1;
  mockedReq.query.nome = "nome";
  mockedReq.query.cor = "vermelho";
  mockedReq.query.ano = 2020;
  Carro.findAll.mockResolvedValue({ id: 1 });
  await bordas.carro_borda_get_um( mockedReq, mockedRes );
  Carro_findAll_res = Carro.findAll.mock.calls[Carro.findAll.mock.calls.length -1][0];
  expect( Carro_findAll_res.include ).toBe('dono');
  expect( Carro_findAll_res.offset ).toBe(30);
  expect( Carro_findAll_res.limit ).toBe(15);
  expect( Carro_findAll_res.where.id ).toBe( mockedReq.query.id );
  expect( Carro_findAll_res.where.nome[Op.like] ).toBe( `%${mockedReq.query.nome}%` );
  expect( Carro_findAll_res.where.cor[Op.like] ).toBe( `%${mockedReq.query.cor}%` );
  expect( Carro_findAll_res.where.ano ).toBe( mockedReq.query.ano );
});
