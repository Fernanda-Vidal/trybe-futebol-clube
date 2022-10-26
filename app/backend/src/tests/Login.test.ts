import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Model } from 'sequelize';
import User from '../database/models/User';
import UserService from '../services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

// import exp from 'constants';

describe('Teste da rota /login', () => {
  describe('POST - deve retornar um status 400', () => {
    it('quando o campo "email" não for informado', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'any_password' })
      expect(httpResponse.status).to.be.eq(400);
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('quando o campo "senha" não for informado', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'any-email@any.com' })
      expect(httpResponse.status).to.be.eq(400);
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    })
  })

  describe('POST - deve retornar um status 401', () => {
    it('quando o campo "email" estiver incorreto', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'any-email@any.com', password: 'secret_admin' })
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password'})
    });

    it('quando o campo "password" estiver incorreto', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'any_password' })
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password'})
    })

    it('quando o campo "password" não existir no banco de dados', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'qualquerSenha' })
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password'})
    });
  })

  describe('quando dados estão corretos e quando token é inválido', () => {
    it('POST - quando os campos "email" e "password" estiverem corretos', async () => {
      const user = { id: 1, username: 'qualquer-nome', role: 'admin', email: 'admin@admin.com', password: 'secret_admin' }
      beforeEach(() => {sinon.stub(Model, 'findOne').resolves(user as User)})
      afterEach(() => sinon.restore())
      
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.have.property('token');
    })

    it('GET - quando é enviado um token inválido na rota /login/validate', async () => {
      beforeEach(() =>  sinon.stub(UserService.prototype, 'authenticate').resolves(false))
      afterEach(() => sinon.restore())
      
      const httpResponse = await chai
      .request(app)
      .get('/login/validate')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid Token' })
    })
  })
});