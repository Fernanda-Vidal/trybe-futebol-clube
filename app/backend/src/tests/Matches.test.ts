import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

import { matches } from './mocks/mocks';

// chai.use(chaiHTTP)

describe('Teste da rota /matches', () => {
  describe('GET', () => {
    it('retorna todas as partidas sem filtro', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
      expect(httpResponse.status).to.be.eq(200);
      // expect(httpResponse.body).to.have.deep.equal(matches);
    })

    it('retorna somente as partidas em andamento', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/matches')
      expect(httpResponse.status).to.be.eq(200);
      // expect(httpResponse.body).to.have.deep.equal(matches.filter(({ inProgress }) => inProgress === true));
    })
  })
})