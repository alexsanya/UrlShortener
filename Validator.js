const crypto = require('crypto');
const linksLength = 7;

(() => {
  'use strict';

  const mask = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi

  class Validator {

    isValidUrl(url) {
      let regex = new RegExp(mask);
      return !!url.match(regex);
    }

    isValidKey(key, shortUrl, url) {
      const linkId = crypto
        .createHmac('sha256', key)
        .update(url)
        .digest('hex')
        .substr(0, linksLength);

      return (shortUrl === linkId);
    }

  }

  Validator.create = () => new Validator();

  module.exports = Validator;
})()
