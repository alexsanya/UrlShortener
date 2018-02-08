const crypto = require('crypto');
const config = require('./config');
const uid = require('uid');

(() => {
  'use strict';

  const linksLength = config.shortLinksLength;
  
  class Encryptor {

    getUniqueLink(url) {
      const key = uid(config.authKeyLength);
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
