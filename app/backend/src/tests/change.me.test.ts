import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Model } from 'sequelize';
import { app } from '../app';
const jwt = require('jsonwebtoken');


import { Response } from 'superagent';
import { encode } from 'punycode';
import { use } from 'chai';
import User from '../database/models/User';
// import exp from 'constants';

chai.use(chaiHttp);

const { expect } = chai;

const mock = { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NjYxODkyNiwiZXhwIjoxNjY2NjE5ODI2fQ.aTU2x0diACIOEAAUWg2Ld77HH8mlbYm9OxzuYgkdtSM" }

describe('Teste da rota POST /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  describe('deve retornar um status 400', () => {
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

  describe('deve retornar um status 401', () => {
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

  describe('deve retornar um status 200', async () => {
    it('quando os campos "email" e "password" estiverem corretos', async () => {
      const user = { id: 1, username: 'qualquer-nome', role: 'admin', email: 'admin@admin.com', password: 'secret_admin' }
      before(() => { sinon.stub(Model, 'findOne').resolves(user as User)})
      after(() => sinon.restore())
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.have.all.keys(['token']);
    })

    it('quando é enviado um token é valido na rota /login/validate', async () => {
      const token = { username: 'Admin',
      id: 1,
      role: 'admin',
      iat: 1666644182,
      exp: 1666645082}
      const testToken = 'test';
      const testSecret = 'test secret';
      before(() => { 
        sinon.stub(jwt, 'verify').returns(token);
      })
      after(() => sinon.restore())
      const httpResponse = await chai
      .request(app)
      .get('/login/validate')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal({ "role": "admin" })
    })
  })

});
