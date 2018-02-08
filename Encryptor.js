const crypto = require('crypto');
const linksLength = 7;

(() => {
  'use strict';

  const uid = require('uid');

  class Encryptor {

    getUniqueLink(url) {
      const key = uid(10);
      const linkId = crypto
        .createHmac('sha256', key)
        .update(url)
        .digest('hex')
        .substr(0, linksLength);

      return {
        url: linkId,
        key
      }
    }

    isValidKey(linkId, key) {
      return true;
    }

  }

  Encryptor.create = () => new Encryptor();

  module.exports = Encryptor;

})()
