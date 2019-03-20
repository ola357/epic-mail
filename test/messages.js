/* import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/app';

// eslint-disable-next-line no-unused-vars
const should = _should();
use(chaiHttp);

//  PARENT BLOCK
describe('Messages', () => {
  //    Test the /GET messages route
  describe('/GET messages', () => {
    it('it should GET all recieved messages', (done) => {
      request(server)
        .get('/api/v1/messages')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
  });
  // end of get messages test suite
  // ***************************
  // Test the Get unread messsages route
  describe('/GET messages/unread', () => {
    it('it should GET all recieved unread messages', (done) => {
      request(server)
        .get('/api/v1/messages/unread')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
  });
  // End Get unread messages test suite
  // ****************************
  // Test Get Sent messages route
  describe('/GET messages/sent', () => {
    it('it should GET all the sent messages', (done) => {
      request(server)
        .get('/api/v1/messages/sent')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
  });
  // End of Get sent messages route
  // **********************
  // Test Get a Specific Message by it's id Route
  describe('/GET/message/:id ', () => {
    it('it should GET a message by the given id', (done) => {
      request(server)
        .get('/api/v1/messages/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it give an error when wrong id is sent', (done) => {
      request(server)
        .get('/api/v1/messages/46')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
  });
  // End of Get specic Message route
  // *******************************
  // Test Post/Create new Message Route
  describe('/POST messages', () => {
    it('it should create a new message', (done) => {
      const message = {
        subject: "Unit Test",
        message: "Install mocha",
        status: "sent",
      };
      request(server)
        .post('/api/v1/messages')
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
    it('validation logic should kick in', (done) => {
      const message = {
        subject: "Unit Test",
        message: "Install mocha",
        status: "refactor",
      };
      request(server)
        .post('/api/v1/messages')
        .send(message)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
  });
  // End Of Post a New Message Route
  // ****************************************
  // Test Delete A Message Route
  describe('/DELETE/messages/:id', () => {
    it('it should DELETE succesfully', (done) => {
      request(server)
        .delete('/api/v1/messages/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
    it('it should throw an error', (done) => {
      request(server)
        .delete('/api/v1/messages/27')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.should.be.json;
          done();
        });
    });
  });
});
 */
