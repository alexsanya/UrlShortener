const crypto = require('crypto');
const config = require('./config');

(() => {
  'use strict';

  const mask = config.urlRegex;
  const linksLength = config.shortLinksLength;

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
