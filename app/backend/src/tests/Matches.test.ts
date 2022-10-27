import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

import { matchesMock, newMatchMock, newMatchUpdated, payloadToken } from './mocks/mocks';
import { Model } from 'sequelize/';
import { INewMatch } from '../interfaces';

describe('Teste da rota /matches', () => {
  describe('1- GET', () => {
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

  describe('2- POST', () => {
    const req = {
      "homeTeam": 16, 
      "awayTeam": 8, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }

    const payload = {
      username: 'Admin',
      id: 1,
      role: 'admin',
      iat: 1666889086,
      exp: 1666889986
    }

    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(newMatchMock as any)
      sinon.stub(jwt, 'verify').resolves(payload)
  })
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

  describe('3- POST', () => {
    const req = {
      "homeTeam": 5, 
      "awayTeam": 8, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }

    const payload = {
      username: 'Admin',
      id: 1,
      role: 'admin',
      iat: 1666889086,
      exp: 1666889986
    }
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2Njg4ODAxMSwiZXhwIjoxNjY2ODg4OTExfQ.1-FhS9WzDokms9dt29-vHCXEpFs4z-3yX6PCOsxMx3o';

    beforeEach(() => sinon.stub(jwt, 'verify').resolves(payload))
    afterEach(() => sinon.restore())
    
    it('não é possível salvar uma partida com ids iguais', async () => {
  const message = 'It is not possible to create a match with two equal teams';
      const httpResponse = await chai
      .request(app)
      .post('/matches')
      .send(req)
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.have.deep.equal({ message: message });
    })
  })
  
  describe.only('4- PATCH', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').resolves(payloadToken)
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