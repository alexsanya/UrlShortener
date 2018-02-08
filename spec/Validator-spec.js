(() => {
  'use strict';

  const chai = require('chai');
  const expect = chai.expect;

  const Validator = require('../Validator');
  const Encryptor = require('../Encryptor');

  describe('validator', () => {

      let validator;
      let encryotor;

      beforeEach(() => {
        validator = Validator.create();
        encryotor = Encryptor.create();
      })

      it('should accept valid URLs', () => {
        expect(validator.isValidUrl('http://site.com')).to.be.true;
        expect(validator.isValidUrl('https://site.com/')).to.be.true;
        expect(validator.isValidUrl('http://site.com/some/long/path')).to.be.true;
        expect(validator.isValidUrl('http://site.com/some/path?p1=v1&p2=v2&p3=v3')).to.be.true;
      })

      it('should decline invalid URLs', () => {
        expect(validator.isValidUrl('smb://myMachine'), 'smb://myMachine').to.be.false;
        expect(validator.isValidUrl('http://123456'), 'http://123456').to.be.false;
        expect(validator.isValidUrl('http://&*weirdDomain'), 'http://&*weirdDomain').to.be.false;
      })

      it('should accept valid key', () => {
        const url = 'http://someUrl.com';
        const linkData = encryotor.getUniqueLink(url);
        expect(validator.isValidKey(linkData.key, linkData.url, url)).to.be.true;
      })

      it('should reject invalid key', () => {
        const url = 'http://someUrl.com';
        const linkData = encryotor.getUniqueLink(url);
        expect(validator.isValidKey(linkData.key + 'wrongPart', linkData.url, url)).to.be.false;
      })

  });

})()
