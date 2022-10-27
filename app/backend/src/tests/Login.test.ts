import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

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
    it('quando o campo "email" for inválido', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'any-emailany.com', password: 'secret_admin' })
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password'})
    });

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

  describe('quando dados estão corretos', () => {
    const user = { id: 1, username: 'qualquer-nome', role: 'admin', email: 'admin@admin.com', password: 'secret_admin' }
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(user as User)
      sinon.stub(bcrypt, 'compareSync').resolves(true)
    })
    afterEach(() => sinon.restore())

    it('POST - quando os campos "email" e "password" estiverem corretos', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.have.property('token');
    })
  })

  describe('quando dados estão corretos', () => {
    const user = { id: 1, username: 'qualquer-nome', role: 'admin', email: 'admin@admin.com', password: 'secret_admin' }
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(user as User)
      sinon.stub(bcrypt, 'compareSync').resolves(true)
    })
    afterEach(() => sinon.restore())

    it('POST - quando os campos "email" e "password" estiverem corretos', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.have.property('token');
    })
  })

  // describe('quando a senha está incorreta', () => {
  //   const user = { id: 1, username: 'qualquer-nome', role: 'admin', email: 'admin@admin.com', password: 'secret_admi' }
  //   beforeEach(() => {
  //     sinon.stub(Model, 'findOne').resolves(user as User)
  //     sinon.stub(bcrypt, 'compareSync').resolves(false)
  //   })
  //   afterEach(() => sinon.restore())

  //   it('POST - quando os campos "email" e "password" estiverem corretos', async () => {
  //     const httpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({ email: 'admin@admin.com', password: 'secret_admi' })
  //     expect(httpResponse.status).to.be.equal(401);
  //     expect(httpResponse.body).to.have.property('Invalid Token');
  //   })
  // })
});