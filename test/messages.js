/* eslint-disable prefer-const */
const chai = require('chai');
const chaiHttp = require('chai-http');

let server;
// require('../server');

// eslint-disable-next-line no-unused-vars
let should = chai.should();


chai.use(chaiHttp);
// Our parent block
describe('/api/v1/messages', () => {
  beforeEach((done) => { // Before each test we empty the database
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line global-require
    server = require('../server/app').default.default;
    done();
  });
  afterEach(() => {
    server.close();
  });
  /*
  * Test the /GET route
  */
  describe('/GET messages', () => {
    it('it should GET all messages', (done) => {
      chai.request(server)
        .get('/api/v1/messages')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST messages', () => {
    it('it should create a new message', (done) => {
      let message = {
        name: "The",
        hqAddress: "Jpf",
        logoUrl: "boom",
      };
      chai.request(server)
        .post('/api/v1/messages')
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('object');
          // res.body.should.have.property('errors');
          // res.body.errors.should.have.property('pages');
          // res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
    it('validation logic should kick in', (done) => {
      let message = {
        name: "The goat is smelly",
        hqAddress: "Jpf",
        logoUrl: "boom",
      };
      chai.request(server)
        .post('/api/v1/messages')
        .send(message)
        .end((err, res) => {
          res.should.have.status(400);
          // res.body.should.be.a('object');
          // res.body.should.have.property('errors');
          // res.body.errors.should.have.property('pages');
          // res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
  });
  describe('/GET/:id message', () => {
    it('it should GET a book by the given id', (done) => {
      chai.request(server)
        .get('/api/v1/messages/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
    it('it give an error when wrong id is sent', (done) => {
      chai.request(server)
        .get('/api/v1/messages/10')
        .end((err, res) => {
          res.should.have.status(404);
          // res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
  });
  /*
* Test the /DELETE/:id route
*/
  describe('/DELETE/:id book', () => {
    /*  it('it should DELETE a book given the id', (done) => {
      let book = new Book({title: "The Chronicles of Narnia",
       author: "C.S. Lewis", year: 1948, pages: 778})
      book.save((err, book) => {
        chai.request(server)
          .delete('/book/' + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Book successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    }); */
    it('it should DELETE succesfully', (done) => {
      chai.request(server)
        .delete('/api/v1/messages/2')
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('object');
          // res.body.should.have.property('title');
          // res.body.should.have.property('author');
          // res.body.should.have.property('pages');
          // res.body.should.have.property('year');
          // res.body.should.have.property('_id').eql(book.id);
          done();
        });
    });
    it('it should throw an error', (done) => {
      chai.request(server)
        .delete('/api/v1/messages/20')
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });
});
