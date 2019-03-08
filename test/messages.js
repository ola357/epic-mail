let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/app');
let should = chai.should();
chai.use(chaiHttp);
//Our parent block
describe('Messages', () => {

/*
  * Test the /GET route
  */
  describe('/GET messages', () => {
      it('it should GET all the messages', (done) => {
        chai.request(server)
            .get('/api/v1/messages')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });
});