(() => {
  'use strict';

  const chai = require('chai');
  const expect = chai.expect;
  chai.should();

  const LinksMap = require('./LinksMap');

  describe('links map', () => {

      let linksMap;

      beforeEach(() => {
        linksMap = new LinksMap();
      })

      it('should return nothing if key ont exists', async () => {
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
