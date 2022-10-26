import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

import { matchesMock } from './mocks/mocks';
import { Model } from 'sequelize/';

// chai.use(chaiHTTP)

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
})