(() => {
  'use strict';

  const mockConsole = {
    info: () => {},
    error: () => {},
    log: () => {}
  }

  const chai = require('chai');
  const urlencode = require('urlencode');
  const clients = require('restify-clients');
  const expect = chai.expect;
  const app = require('./app')(mockConsole);
  chai.should();

  describe('API', () => {

    let client;
    let linkData;

    before(() => {
      client = clients.createJsonClient({
        url: 'http://localhost:8080'
      });
    })

    it('should return 404 for not existing link', (done) => {
      client.get('/link/abcde', (err, req, res, obj) => {
        expect(err).to.be.an('object');
        res.statusCode.should.be.equal(404);
        done();
      });
    })

    it('should create short link', (done) => {
      client.post('/link/create', { url: urlencode('http://google.com', 'gbk') }, (err, req, res, obj) => {
        expect(err).to.be.null;
        res.statusCode.should.be.equal(201);
        expect(obj).to.be.an('object');
        linkData = obj;
        done();
      })
    })


    it('should reject wrong url format', (done) => {
      client.post('/link/create', { url: urlencode('http://&*&*', 'gbk') }, (err, req, res, obj) => {
        expect(err).to.be.an('object');
        res.statusCode.should.be.equal(400);
        done();
      })
    })

    it('should return redirect for existing link', (done) => {
      client.get('/link/' + linkData.shortenUrl, (err, req, res, obj) => {
        expect(err).to.be.null;
        res.statusCode.should.be.equal(301);
        res.headers['location'].should.be.equal('http://google.com');
        done();
      });
    })

    it('should not allow link removal if key is wrong', (done) => {
      const options = {
        path: '/link/' + linkData.shortenUrl,
        headers: {
          'x-auth-key': linkData.key + 'wrong'
        }
      }

      client.del(options, (err, req, res, obj) => {
        expect(err).to.be.an('object');
        res.statusCode.should.be.equal(401);
        done();
      });
    })

    it('should remove link if key is correct', (done) => {
      const options = {
        path: '/link/' + linkData.shortenUrl,
        headers: {
          'x-auth-key': linkData.key
        }
      }

      client.del(options, (err, req, res, obj) => {
        expect(err).to.be.null;
        res.statusCode.should.be.equal(204);
        done();
      });
    })

    it('should return 404 for deleted link', (done) => {
      client.get('/link/' + linkData.shortenUrl, (err, req, res, obj) => {
        expect(err).to.be.an('object');
        res.statusCode.should.be.equal(404);
        done();
      });
    })

  })

})()
