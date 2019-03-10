import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/app';
import { users } from '../server/models/users';

// eslint-disable-next-line no-unused-vars
const should = _should();
use(chaiHttp);

//  PARENT BLOCK
describe('Authentication', () => {
  // Test the /POST auth/signup route
  describe('/POST auth/signup', () => {
    it('it should signup a new user', (done) => {
      const user = {
        email: "andela@epicmail.com",
        firstName: "John",
        lastName: "Bull",
        password: "growing15",
      };
      request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('validation logic should kick in', (done) => {
      const user = {
        email: "a",
        firstName: "John",
        lastName: "Bull",
        password: "growing15",
      };
      request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('throw error if user already registered', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send(users[1])
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  // Test Suite for the POST /auth/login (LOGIN USERS) ROUTE
  describe('/POST auth/login', () => {
    it('it should login a user', (done) => {
      const user = {
        email: "ola357@epicmail.com",
        password: "abc123",
      };
      request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('validation logic should kick in', (done) => {
      const user = {
        email: "a",
        password: "growing15",
      };
      request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('throw error if user is not registered', (done) => {
      const user = {
        email: "bolatito@epicmail.com",
        password: "abc123",
      };
      request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('throw error if user password is wrong', (done) => {
      const user = {
        email: "ola357@epicmail.com",
        password: "freebie34",
      };
      request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
