import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

import { matchesMock, newMatchMock, newMatchUpdated } from './mocks/mocks';
import { Model } from 'sequelize/';
import { INewMatch } from '../interfaces';

describe('Teste da rota /matches', () => {
  describe('GET', () => {
    // const inprogress = matchesMock.filter(({ inProgress }) => inProgress === true)
    beforeEach(() => {
      sinon.stub(Model, 'findAll').resolves(matchesMock as any)
      // sinon.stub(Model, 'findOne').resolves(inprogress as any)
  })
    afterEach(() => sinon.restore())
    
    it('retorna todas as partidas sem filtro', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.have.deep.equal(matchesMock);
    })
  })

  describe('POST', () => {
    const req = {
      "homeTeam": 16, 
      "awayTeam": 8, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }

    beforeEach(() => sinon.stub(Model, 'create').resolves(newMatchMock as any))
    afterEach(() => sinon.restore())
    
    it('é possível salvar uma partida', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/matches')
      .send(req)
      expect(httpResponse.status).to.be.eq(201);
      expect(httpResponse.body).to.have.deep.equal(newMatchMock);
    })
  })
  
  describe('PATCH', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findByPk').resolves(newMatchMock as any)
      sinon.stub(Model, 'update').resolves(true as any)
    })
    afterEach(() => sinon.restore())
    
    it('é possível alterar o progresso de uma partida', async () => {
      const httpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.have.deep.equal({ message: 'Finished' });
    })
  })
})