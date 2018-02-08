(() => {
  'use strict';

  const chai = require('chai');
  const assert = chai.assert;

  const Validator = require('./Validator');
  const Encryptor = require('./Encryptor');

  describe('validator', () => {

      let validator;
      let encryotor;

      beforeEach(() => {
        validator = Validator.create();
        encryotor = Encryptor.create();
      })

      it('should accept valid URLs', () => {
        assert.isTrue(validator.isValidUrl('http://site.com'));
        assert.isTrue(validator.isValidUrl('https://site.com/'));
        assert.isTrue(validator.isValidUrl('http://site.com/some/long/path'));
        assert.isTrue(validator.isValidUrl('http://site.com/some/path?p1=v1&p2=v2&p3=v3'));
      })

      it('should decline invalid URLs', () => {
        assert.isFalse(validator.isValidUrl('smb://myMachine'), 'smb://myMachine');
        assert.isFalse(validator.isValidUrl('http://123456'), 'http://123456');
        assert.isFalse(validator.isValidUrl('http://&*weirdDomain'), 'http://&*weirdDomain');
      })

      it('should accept valid key', () => {
        const url = 'http://someUrl.com';
        const linkData = encryotor.getUniqueLink(url);
        assert.isTrue(validator.isValidKey(linkData.key, linkData.url, url));
      })

      it('should reject invalid key', () => {
        const url = 'http://someUrl.com';
        const linkData = encryotor.getUniqueLink(url);
        assert.isFalse(validator.isValidKey(linkData.key + 'wrongPart', linkData.url, url));
      })

  });

})()
