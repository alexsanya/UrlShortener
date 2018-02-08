(() => {
  'use strict';

  const chai = require('chai');
  const assert = chai.assert;

  const Validator = require('./Validator');

  describe('validator', () => {

      let validator;

      beforeEach(() => {
        validator = new Validator();
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

  });

})()
