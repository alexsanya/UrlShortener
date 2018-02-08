(() => {
  'use strict';

  const chai = require('chai');
  const assert = chai.assert;

  const LinksMap = require('./LinksMap');

  describe('links map', () => {

      let linksMap;

      beforeEach(() => {
        linksMap = new LinksMap();
      })

      it('should return nothing if key ont exists', () => {
        assert.isTrue(typeof linksMap.getUrl('abcde') === 'undefined');
      })

      it('should return value if key exists', () => {
        linksMap.storeShortUrl('abcde', 'http://url');
        console.log(linksMap.getUrl('abcde'));
        assert.isTrue(linksMap.getUrl('abcde') === 'http://url');
      })

      it('should return nothing after key removed', () => {
        linksMap.storeShortUrl('abcde', 'http://url');
        assert.isTrue(linksMap.getUrl('abcde') === 'http://url');
        linksMap.removeShortLink('abcde');
        assert.isTrue(typeof linksMap.getUrl('abcde') === 'undefined');
      })
  });

})()
