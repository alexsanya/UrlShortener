(() => {
  'use strict';

  const chai = require('chai');
  const expect = chai.expect;
  chai.should();

  const LinksMap = require('../LinksMap');

  class MockMemCached {

    constructor() {
      this.map = new Map();
    }

    get(linkId, callback) {
      const url = this.map.get(linkId);
      if (url) callback(null, url)
      else callback('error', null) 
    }

    set(linkId, url, ttl, callback) {
      this.map.set(linkId, url);
      callback(null);
    }

    del(linkId, callback)  {
      this.map.delete(linkId);
      callback(null);
    }

  }

  MockMemCached.create = () => {
    return new MockMemCached();
  }

  describe('links map', () => {

      let linksMap;

      beforeEach(() => {
        linksMap = LinksMap.create(MockMemCached.create());
      })

      it('should return nothing if key not exists', async () => {
        const url = await linksMap.getUrl('abcde');
        expect(url).to.be.a('undefined');
      })

      it('should return value if key exists', async () => {
        await linksMap.storeShortUrl('abcde', 'http://url');
        const url = await linksMap.getUrl('abcde');
        url.should.be.equal('http://url');
      })

      it('should return nothing after key removed', async () => {
        await linksMap.storeShortUrl('abcde', 'http://url');
        const url = await linksMap.getUrl('abcde');
        url.should.be.equal('http://url');
        await linksMap.removeShortLink('abcde');
        const neUrl = await linksMap.getUrl('abcde');
        expect(neUrl).to.be.a('undefined');
      })
  });

})()
