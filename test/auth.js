import { should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import db from '../server/models/db';

import server from '../server/app';

dotenv.config();
// import { users } from '../server/models/users';
process.env.NODE_ENV = 'test';
console.log(process.env.NODE_ENV);
// eslint-disable-next-line no-unused-vars
should();
use(chaiHttp);


//  PARENT BLOCK
describe('Authentication', () => {
  // Test the /POST auth/signup route
  after(async (done) => {
    db.query(`
    DELETE FROM users 
    WHERE email = ($1)`,
    ["angela@epicmail.com"]).then(() => {
    });
    done();
  });
  describe('/POST auth/signup', () => {
    it('it should signup a new user', (done) => {
      const user = {
        username: "angela@epicmail.com",
        firstname: "John",
        lastname: "Bull",
        password: "growing15",
      };
      request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
    it('validation logic should kick in', (done) => {
      const user = {
        email: "a",
        firstname: "John",
        lastname: "Bull",
        password: "growing15",
      };
      request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    it('throw error if user already registered', (done) => {
      request(server)
        .post('/api/v2/auth/signup')
        .send({
          username: "angela@epicmail.com",
          firstname: "John",
          lastname: "Bull",
          password: "growing15",
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
  });
  // Test Suite for the POST /auth/login (LOGIN USERS) ROUTE
  describe('/POST auth/login', () => {
    it('it should login a user', (done) => {
      const user = {
        email: "angela@epicmail.com",
        password: "growing15",
      };
      request(server)
        .post('/api/v2/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
    it('validation logic should kick in', (done) => {
      const user = {
        email: "a",
        password: "growing15",
      };
      request(server)
        .post('/api/v2/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          // res.should.be.json;
          done();
        });
    });
    it('throw error if user is not registered', (done) => {
      const user = {
        email: "bolatito@epicmail.com",
        password: "abc123",
      };
      request(server)
        .post('/api/v2/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          // res.should.be.json;
          done();
        });
    });
    it('throw error if user password is wrong', (done) => {
      const user = {
        email: "ola357@epicmail.com",
        password: "freebie34",
      };
      request(server)
        .post('/api/v2/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          // res.should.be.json;
          done();
        });
    });
  });
});
