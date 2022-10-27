import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

import { inProgress, matchesMock, newMatchMock, newMatchUpdated, payloadToken } from './mocks/mocks';
import { Model } from 'sequelize/';
import { INewMatch } from '../interfaces';

describe('Teste da rota /matches', () => {
  describe('1- GET', () => {
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

  describe('1- GET', () => {
    beforeEach(() => sinon.stub(Model, 'findAll').resolves(inProgress as any))
    afterEach(() => sinon.restore())
    
    it('retorna somente as partidas em progresso', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.have.deep.equal(inProgress);
    })
  })

  describe('2- POST', () => {
    const req = {
      "homeTeam": 16, 
      "awayTeam": 8, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }

    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(newMatchMock as any)
      sinon.stub(jwt, 'verify').resolves(payloadToken)
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
      "homeTeam": 8, 
      "awayTeam": 8, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }

    
    beforeEach(() => {
      sinon.stub(jwt, 'verify').resolves(payloadToken)
      sinon.stub(Model, 'create').resolves(newMatchUpdated as any)
    })
    afterEach(() => sinon.restore())
    
    it('não é possível salvar uma partida com ids iguais', async () => {
      const message = 'It is not possible to create a match with two equal teams';
      const httpResponse = await chai
      .request(app)
      .post('/matches')
      .send(req)
      expect(httpResponse.status).to.be.eq(422);
      expect(httpResponse.body).to.have.deep.equal({ message: message });
    })
  })
  
  describe('4- PATCH', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').resolves(payloadToken)
      sinon.stub(Model, 'findByPk').resolves(newMatchMock as any)
      sinon.stub(Model, 'update').resolves([{ lineUpdate : 1}] as any)
    })
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2Njg4ODAxMSwiZXhwIjoxNjY2ODg4OTExfQ.1-FhS9WzDokms9dt29-vHCXEpFs4z-3yX6PCOsxMx3o';
    afterEach(() => sinon.restore())
    
    it('é possível alterar o progresso de uma partida', async () => {
      const httpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .send()
      .set('Authorization', 'token')
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.have.deep.equal({ message: 'Finished' });
    })
  })
})