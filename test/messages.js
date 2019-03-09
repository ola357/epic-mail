import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/app';

// eslint-disable-next-line no-unused-vars
const should = _should();
use(chaiHttp);
//  Our parent block
describe('Messages', () => {
  //    Test the /GET messages route
  describe('/GET messages', () => {
    it('it should GET all the messages', (done) => {
      request(server)
        .get('/api/v1/messages')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
