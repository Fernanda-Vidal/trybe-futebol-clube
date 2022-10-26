import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { teamsMock } from './mocks/mocks';
import { Model } from 'sequelize';
import { ITeams } from '../interfaces';
chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /teams', () => {
    describe('GET', () => {
        it('retorna informação de todos os times', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/teams')
            expect(httpResponse.status).to.be.eq(200);
            expect(httpResponse.body).to.be.deep.equal(teamsMock);
        })

        it('retorna corretamente o time buscando por id', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/teams/4')
            expect(httpResponse.status).to.be.eq(200);
            expect(httpResponse.body).to.be.deep.equal(teamsMock[3]);
        })
    })
})