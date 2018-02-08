const crypto = require('crypto');

(() => {
  'use strict';

  const uid = require('uid');

  class Encryptor {

    getUniqueLink() {
      return {
        url: uid(10),
        key: 35
      }
    }

    isValidKey(linkId, key) {
      return true;
    }

  }

  Encryptor.create = () => new Encryptor();

  module.exports = Encryptor;

})()
